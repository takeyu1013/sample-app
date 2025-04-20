"use server";

import { parseWithZod } from "@conform-to/zod";

import { micropostSchema, updateMicropost } from "@/lib/router";
import { redirect } from "next/navigation";

export const updateMicropostAction = async (
	id: string,
	state: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: micropostSchema.pick({ content: true, userId: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	await updateMicropost({ id, ...submission.value });
	redirect(`/micropost/${id}`);
};
