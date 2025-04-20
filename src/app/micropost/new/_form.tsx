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
import { createMicropostAction } from "./_action";

export const Form = ({
	userList,
}: {
	userList: z.infer<typeof userSchema>[];
}) => {
	const [lastResult, action, isPending] = useActionState(
		createMicropostAction,
		undefined,
	);
	const [form, { content, userId }] = useForm({
		defaultValue: { content: "", userId: "" },
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
					Create Micropost
				</button>
			</div>
		</form>
	);
};
