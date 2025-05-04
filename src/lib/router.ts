import { ORPCError, os } from "@orpc/server";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "./db";
import { micropostTable, userTable } from "./db/schema";

const tags = ["Default"];
const PAGE_SIZE = 30 as const;

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
});

export const readUser = os
	.route({ method: "GET", path: "/user/{id}", tags })
	.input(userSchema.pick({ id: true }))
	.output(userSchema)
	.handler(async ({ input: { id } }) => {
		const result = (
			await db.select().from(userTable).where(eq(userTable.id, id))
		).at(0);
		if (!result) {
			throw new ORPCError("NOT_FOUND");
		}
		return result;
	})
	.callable();

export const listUser = os
	.route({ method: "GET", path: "/user/list", tags })
	.input(z.object({ page: z.number().optional() }).optional().default({}))
	.output(z.object({ list: z.array(userSchema), count: z.number() }))
	.handler(async ({ input: { page = 1 } }) => {
		const [list, [{ count: rowCount }]] = await Promise.all([
			db
				.select()
				.from(userTable)
				.limit(PAGE_SIZE)
				.offset((page - 1) * PAGE_SIZE),
			db.select({ count: count() }).from(userTable),
		]);
		return { list, count: Math.ceil(rowCount / PAGE_SIZE) };
	})
	.callable();

export const micropostSchema = z.object({
	id: z.string(),
	content: z.string(),
	userId: z.string(),
});

export const createMicropost = os
	.route({ method: "POST", path: "/micropost", successStatus: 201, tags })
	.input(micropostSchema.pick({ content: true, userId: true }))
	.output(micropostSchema.pick({ id: true }))
	.handler(async ({ input }) => {
		const result = (
			await db.insert(micropostTable).values(input).returning()
		).at(0);
		if (!result) {
			throw new ORPCError("NOT_FOUND");
		}
		return { id: result.id };
	})
	.callable();

export const readMicropost = os
	.route({ method: "GET", path: "/micropost/{id}", tags })
	.input(micropostSchema.pick({ id: true }))
	.output(micropostSchema)
	.handler(async ({ input: { id } }) => {
		const result = (
			await db.select().from(micropostTable).where(eq(micropostTable.id, id))
		).at(0);
		if (!result) {
			throw new ORPCError("NOT_FOUND");
		}
		return result;
	})
	.callable();

export const updateMicropost = os
	.route({ method: "PUT", path: "/micropost/{id}", successStatus: 204, tags })
	.input(micropostSchema)
	.handler(async ({ input: { id, ...rest } }) => {
		await db.update(micropostTable).set(rest).where(eq(micropostTable.id, id));
	})
	.callable();

export const deleteMicropost = os
	.route({
		inputStructure: "detailed",
		method: "DELETE",
		path: "/micropost/{id}",
		successStatus: 204,
		tags,
	})
	.input(z.object({ params: micropostSchema.pick({ id: true }) }))
	.handler(
		async ({
			input: {
				params: { id },
			},
		}) => await db.delete(micropostTable).where(eq(micropostTable.id, id)),
	)
	.callable();

export const listMicropost = os
	.route({ method: "GET", path: "/micropost/list", tags })
	.output(z.array(micropostSchema))
	.handler(async () => await db.select().from(micropostTable))
	.callable();

export const router = {
	readUser,
	listUser,
	createMicropost,
	readMicropost,
	updateMicropost,
	deleteMicropost,
	listMicropost,
};
