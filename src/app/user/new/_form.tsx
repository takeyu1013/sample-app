"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useActionState } from "react";
import { createUserAction } from "./_action";

export const Form = () => {
	const [lastResult, action, isPending] = useActionState(
		createUserAction,
		undefined,
	);
	const [form, { email, name }] = useForm({
		defaultValue: { email: "", name: "" },
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
					Create User
				</button>
			</div>
		</form>
	);
};
