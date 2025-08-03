"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { ORPCError } from "@orpc/client";
import { revalidatePath } from "next/cache";

import { createMicropost, micropostSchema } from "@/lib/router";

export const createMicropostAction = async (
	_state: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: micropostSchema.pick({ content: true }),
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	try {
		await createMicropost(submission.value);
		revalidatePath("/");
		return submission.reply({ resetForm: true });
	} catch (error) {
		const formErrors =
			error instanceof ORPCError ? [error.message] : [`${error}`];
		return submission.reply({ formErrors });
	}
};
