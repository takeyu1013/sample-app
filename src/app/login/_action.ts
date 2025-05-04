"use server";

import { parseWithZod } from "@conform-to/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";

export const logInAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: z.object({
			email: z.string().email(),
			password: z.string(),
		}),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	try {
		const {
			user: { id },
		} = await auth.api.signInEmail({ body: submission.value });
		redirect(`/user/${id}`);
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return submission.reply({
			formErrors: ["Invalid email/password combination"],
		});
	}
};
