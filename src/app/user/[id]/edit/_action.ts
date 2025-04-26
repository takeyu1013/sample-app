"use server";

import { parseWithZod } from "@conform-to/zod";

import { userSchema } from "@/lib/router";

export const updateUserAction = async (
	id: string,
	state: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: userSchema.pick({ email: true, name: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	// await updateUser({ id, ...submission.value });
	// redirect(`/user/${id}`);
};
