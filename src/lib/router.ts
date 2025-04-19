import { os } from "@orpc/server";
import { z } from "zod";
import { db } from "./db";
import { userTable } from "./db/schema";

const todoSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
});

export const createUser = os
	.route({ method: "POST" })
	.input(
		z.object({
			name: z.string(),
			email: z.string(),
		}),
	)
	.output(z.object({ id: z.string() }))
	.handler(
		async ({ input }) =>
			(await db.insert(userTable).values(input).returning())[0],
	)
	.callable();

export const listUser = os
	.route({ method: "GET" })
	.output(z.array(todoSchema))
	.handler(async () => await db.select().from(userTable))
	.callable();

export const router = {
	user: {
		create: createUser,
		list: listUser,
	},
};
