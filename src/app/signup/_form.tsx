"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";

import { createUserAction } from "./_action";

export const Form = () => {
	const [lastResult, action, isPending] = useActionState(
		createUserAction,
		undefined,
	);
	const [form, { email, name, password, passwordConfirmation }] = useForm({
		defaultValue: {
			email: "",
			name: "",
			password: "",
			passwordConfirmation: "",
		},
		lastResult,
	});

	return (
		<Stack
			renderRoot={(props) => (
				<form {...props} {...getFormProps(form)} action={action} />
			)}
		>
			<TextInput {...getInputProps(name, { type: "text" })} label="Name" />
			<TextInput {...getInputProps(email, { type: "text" })} label="Email" />
			<TextInput
				{...getInputProps(password, { type: "password" })}
				label="Password"
			/>
			<TextInput
				{...getInputProps(passwordConfirmation, { type: "password" })}
				label="Confirmation"
			/>
			<Button disabled={isPending} type="submit">
				Create My Account
			</Button>
		</Stack>
	);
};
