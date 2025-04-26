"use server";

import { parseWithZod } from "@conform-to/zod";

import { auth } from "@/lib/auth";
import { userSchema } from "@/lib/router";
import { redirect } from "next/navigation";

export const createUserAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: userSchema.pick({ email: true, name: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const {
		user: { id },
	} = await auth.api.signUpEmail({
		body: { ...submission.value, password: "password" },
	});
	redirect(`/user/${id}`);
};
