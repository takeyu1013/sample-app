"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { createMicropost, micropostSchema } from "@/lib/router";

export const createMicropostAction = async (
	state: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: micropostSchema.pick({ content: true, userId: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const { id } = await createMicropost(submission.value);
	redirect(`/micropost/${id}`);
};
