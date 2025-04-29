"use server";

import { parseWithZod } from "@conform-to/zod";
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
	const {
		user: { id },
	} = await auth.api.signInEmail({ body: submission.value });
	redirect(`/user/${id}`);
};
