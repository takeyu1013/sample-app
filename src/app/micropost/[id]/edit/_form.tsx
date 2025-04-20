"use client";

import {
	getFormProps,
	getInputProps,
	getSelectProps,
	useForm,
} from "@conform-to/react";
import { useActionState } from "react";
import type { z } from "zod";

import type { userSchema } from "@/lib/router";

import { updateMicropostAction } from "./_action";

export const Form = ({
	id,
	content: defaultContent,
	userId: defaultUserId,
	userList,
}: {
	id: string;
	content: string;
	userId: string;
	userList: z.infer<typeof userSchema>[];
}) => {
	const [lastResult, action, isPending] = useActionState(
		updateMicropostAction.bind(undefined, id),
		undefined,
	);
	const [form, { content, userId }] = useForm({
		defaultValue: { content: defaultContent, userId: defaultUserId },
		lastResult,
	});

	return (
		<form {...getFormProps(form)} action={action}>
			<div>
				<label htmlFor="content" style={{ display: "block" }}>
					Content
				</label>
				<input {...getInputProps(content, { type: "text" })} />
			</div>
			<div>
				<label htmlFor="userId" style={{ display: "block" }}>
					User
				</label>
				<select {...getSelectProps(userId)}>
					{userList.map(({ id, name, email }) => (
						<option key={id} value={id}>
							{name}({email})
						</option>
					))}
				</select>
			</div>
			<div>
				<button disabled={isPending} type="submit">
					Update Micropost
				</button>
			</div>
		</form>
	);
};
