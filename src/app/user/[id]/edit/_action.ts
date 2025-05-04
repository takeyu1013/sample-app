"use server";

import { parseWithZod } from "@conform-to/zod";
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
				password: z.string().optional(),
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
	const { changeEmail, getSession, setPassword, updateUser } = auth.api;
	const session = await getSession({ headers });
	if (!session) {
		return submission.reply();
	}

	const {
		user: { id, email },
	} = session;
	const { email: newEmail, name, password } = submission.value;
	const operationList = [updateUser({ body: { name }, headers })];
	const operationListEmail =
		email !== newEmail ? [changeEmail({ body: { newEmail }, headers })] : [];
	const operationListPassword = password
		? [setPassword({ body: { newPassword: password }, headers })]
		: [];
	await Promise.all([
		...operationList,
		...operationListEmail,
		...operationListPassword,
	]);
	redirect(`/user/${id}`);
};
