import { os } from "@orpc/server";
import { z } from "zod";
import { db } from "./db";
import { userTable } from "./db/schema";

const todoSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
});

export const listUser = os
	.route({ method: "GET" })
	.output(z.array(todoSchema))
	.handler(async () => await db.select().from(userTable))
	.callable();

export const router = {
	user: {
		list: listUser,
	},
};
