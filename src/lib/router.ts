import { oo } from "@orpc/openapi";
import { os } from "@orpc/server";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "./auth";
import { db } from "./db";
import { micropostTable, userTable } from "./db/schema";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
});

const authBase = os
	.use(
		os
			.errors({
				UNAUTHORIZED: {},
			})
			.middleware(async ({ errors: { UNAUTHORIZED }, next }) => {
				const result = await auth.api.getSession({ headers: await headers() });
				if (!result) {
					throw UNAUTHORIZED;
				}
				return next({ context: result });
			}),
	)
	.errors({
		UNAUTHORIZED: oo.spec({}, { security: [{ apiKeyCookie: [] }] }),
	});

export const readUser = authBase
	.route({ method: "GET", path: "/user/{id}" })
	.errors({ NOT_FOUND: {} })
	.input(userSchema.pick({ id: true }))
	.output(userSchema)
	.handler(async ({ errors: { NOT_FOUND }, input: { id } }) => {
		const result = (
			await db.select().from(userTable).where(eq(userTable.id, id))
		).at(0);
		if (!result) {
			throw NOT_FOUND;
		}
		return result;
	})
	.callable();

export const listUser = authBase
	.route({ method: "GET", path: "/user/list" })
	.input(
		z
			.object({ limit: z.number().optional(), offset: z.number().optional() })
			.optional()
			.default({}),
	)
	.output(z.object({ list: z.array(userSchema), total: z.number() }))
	.handler(async ({ input: { limit, offset = 0 } }) => {
		const baseQuery = db.select().from(userTable).offset(offset);
		const query = limit ? baseQuery.limit(limit) : baseQuery;
		const [list, [{ count: total }]] = await Promise.all([
			query,
			db.select({ count: count() }).from(userTable),
		]);
		return { list, total };
	})
	.callable();

export const micropostSchema = z.object({
	id: z.string(),
	content: z.string(),
	createdAt: z.date(),
	userId: z.string(),
});

export const createMicropost = os
	.route({ method: "POST", path: "/micropost", successStatus: 201 })
	.errors({ NOT_FOUND: {} })
	.input(micropostSchema.pick({ content: true, userId: true }))
	.output(micropostSchema.pick({ id: true }))
	.handler(async ({ errors: { NOT_FOUND }, input }) => {
		const result = (
			await db.insert(micropostTable).values(input).returning()
		).at(0);
		if (!result) {
			throw NOT_FOUND;
		}
		return { id: result.id };
	})
	.callable();

export const readMicropost = os
	.route({ method: "GET", path: "/micropost/{id}" })
	.errors({ NOT_FOUND: {} })
	.input(micropostSchema.pick({ id: true }))
	.output(micropostSchema)
	.handler(async ({ errors: { NOT_FOUND }, input: { id } }) => {
		const result = (
			await db.select().from(micropostTable).where(eq(micropostTable.id, id))
		).at(0);
		if (!result) {
			throw NOT_FOUND;
		}
		return result;
	})
	.callable();

export const updateMicropost = os
	.route({ method: "PUT", path: "/micropost/{id}", successStatus: 204 })
	.input(micropostSchema.pick({ id: true, content: true, userId: true }))
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

export const listMicropost = authBase
	.route({ method: "GET", path: "/micropost/list" })
	.input(
		z.object({
			limit: z.number().optional(),
			offset: z.number().optional(),
			userId: z.string(),
		}),
	)
	.output(z.object({ list: z.array(micropostSchema), total: z.number() }))
	.handler(async ({ input: { limit, offset = 0, userId } }) => {
		const baseQuery = db
			.select()
			.from(micropostTable)
			.where(eq(micropostTable.userId, userId))
			.offset(offset);
		const query = limit ? baseQuery.limit(limit) : baseQuery;
		const [list, [{ count: total }]] = await Promise.all([
			query,
			db
				.select({ count: count() })
				.from(micropostTable)
				.where(eq(micropostTable.userId, userId)),
		]);
		return { list, total };
	})
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
