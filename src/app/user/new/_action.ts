"use server";

import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

import { createUser } from "@/lib/router";

export const createUserAction = async (state: unknown, formData: FormData) => {
	console.log(...formData.entries());
	const submission = parseWithZod(formData, {
		schema: z.object({ name: z.string(), email: z.string() }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	console.log(submission.value);
	const { id } = await createUser(submission.value);
	console.log("id: ", id);
};
