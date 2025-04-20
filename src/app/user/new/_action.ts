"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { createUser, userSchema } from "@/lib/router";

export const createUserAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: userSchema.pick({ email: true, name: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const { id } = await createUser(submission.value);
	redirect(`/user/${id}`);
};
