"use server";

import { parseWithZod } from "@conform-to/zod";
import { APIError } from "better-auth/api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";

export const createUserAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: z
			.object({
				email: z.string().email(),
				name: z.string(),
				password: z.string().min(8).max(32),
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
	try {
		const {
			user: { id },
		} = await auth.api.signUpEmail({
			body: submission.value,
		});
		redirect(`/user/${id}`);
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		if (error instanceof APIError) {
			return submission.reply({
				formErrors: [error.message],
			});
		}
		return submission.reply({
			formErrors: [`${error}`],
		});
	}
};
