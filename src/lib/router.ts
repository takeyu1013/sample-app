import { ORPCError, os } from "@orpc/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "./db";
import { userTable } from "./db/schema";

const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
});

export const createUser = os
	.route({ method: "POST", path: "/user", successStatus: 201 })
	.input(userSchema.pick({ email: true, name: true }))
	.output(userSchema.pick({ id: true }))
	.handler(async ({ input }) => {
		const result = (await db.insert(userTable).values(input).returning()).at(0);
		if (!result) {
			throw new ORPCError("NOT_FOUND");
		}
		return { id: result.id };
	})
	.callable();

export const listUser = os
	.route({ method: "GET", path: "/user/list" })
	.output(z.array(userSchema))
	.handler(async () => await db.select().from(userTable))
	.callable();

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

export const router = { createUser, listUser, readUser };
