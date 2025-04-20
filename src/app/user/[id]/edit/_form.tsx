"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useActionState } from "react";

import { updateUserAction } from "./_action";

export const Form = ({
	id,
	email: defaultEmail,
	name: defaultName,
}: { id: string; email: string; name: string }) => {
	const [lastResult, action, isPending] = useActionState(
		updateUserAction.bind(undefined, id),
		undefined,
	);
	const [form, { email, name }] = useForm({
		defaultValue: { email: defaultEmail, name: defaultName },
		lastResult,
	});

	return (
		<form {...getFormProps(form)} action={action}>
			<div>
				<label htmlFor="name" style={{ display: "block" }}>
					Name
				</label>
				<input {...getInputProps(name, { type: "text" })} />
			</div>
			<div>
				<label htmlFor="email" style={{ display: "block" }}>
					Email
				</label>
				<input {...getInputProps(email, { type: "email" })} />
			</div>
			<div>
				<button disabled={isPending} type="submit">
					Update User
				</button>
			</div>
		</form>
	);
};
