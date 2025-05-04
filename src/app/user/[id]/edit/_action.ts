"use server";

import { parseWithZod } from "@conform-to/zod";
import { APIError } from "better-auth/api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";

export const updateUserAction = async (state: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: z
			.object({
				email: z.string().email(),
				name: z.string(),
				password: z.string().min(8).max(32).optional(),
				passwordConfirmation: z.string().optional(),
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

	const headers = await nextHeaders();
	const { changeEmail, getSession, updateUser } = auth.api;
	const session = await getSession({ headers });
	if (!session) {
		return submission.reply();
	}

	const {
		user: { id, email },
	} = session;
	const { email: newEmail, name, password } = submission.value;
	const conditionalOperationEmail =
		email !== newEmail ? [changeEmail({ body: { newEmail }, headers })] : [];
	const updatePassword = async (id: string, password: string) => {
		const ctx = await auth.$context;
		const hash = await ctx.password.hash(password);
		await ctx.internalAdapter.updatePassword(id, hash);
	};
	const conditionalOperationPassword = password
		? [updatePassword(id, password)]
		: [];
	try {
		await Promise.all([
			updateUser({ body: { name }, headers }),
			...conditionalOperationEmail,
			...conditionalOperationPassword,
		]);
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
