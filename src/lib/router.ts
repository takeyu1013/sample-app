import { ORPCError, os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "./db";
import { micropostTable, userTable } from "./db/schema";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
});

export const readUser = os
	.route({ method: "GET", path: "/user/{id}" })
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
	.route({ method: "GET", path: "/user/list" })
	.output(z.array(userSchema))
	.handler(async () => await db.select().from(userTable))
	.callable();

export const micropostSchema = z.object({
	id: z.string(),
	content: z.string(),
	userId: z.string(),
});

export const createMicropost = os
	.route({ method: "POST", path: "/micropost", successStatus: 201 })
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
	.route({ method: "GET", path: "/micropost/{id}" })
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
	.route({ method: "PUT", path: "/micropost/{id}", successStatus: 204 })
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
	.route({ method: "GET", path: "/micropost/list" })
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
