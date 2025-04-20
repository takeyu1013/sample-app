"use server";

import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

import { updateUser } from "@/lib/router";
import { redirect } from "next/navigation";

export const updateUserAction = async (
	id: string,
	state: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: z.object({ name: z.string(), email: z.string() }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	await updateUser({ id, ...submission.value });
	redirect(`/user/${id}`);
};
