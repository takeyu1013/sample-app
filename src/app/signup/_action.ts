"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";

export const createUserAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: z
			.object({
				email: z.string().email(),
				name: z.string(),
				password: z.string(),
				passwordConfirmation: z.string(),
			})
			.refine(
				({ password, passwordConfirmation }) =>
					password === passwordConfirmation,
				{
					message: "Password confirmation doesn't match Password",
					path: ["passwordConfirmation"],
				},
			),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const {
		user: { id },
	} = await auth.api.signUpEmail({
		body: submission.value,
	});
	redirect(`/user/${id}`);
};
