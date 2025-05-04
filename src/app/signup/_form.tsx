"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Alert, Button, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";

import { usePreventDefault } from "@/lib/hook";

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
	usePreventDefault(form.id);
	const errorResult = form.errors?.at(0);

	return (
		<Stack
			renderRoot={(props) => (
				<form {...props} {...getFormProps(form)} action={action} />
			)}
		>
			{errorResult && <Alert color="red">{errorResult}</Alert>}
			<TextInput
				{...getInputProps(name, { type: "text" })}
				error={name.errors?.toString()}
				label="Name"
				styles={{ input: { fontSize: 16 } }}
			/>
			<TextInput
				{...getInputProps(email, { type: "text" })}
				error={email.errors?.toString()}
				label="Email"
				styles={{ input: { fontSize: 16 } }}
			/>
			<TextInput
				{...getInputProps(password, { type: "password" })}
				error={password.errors?.toString()}
				label="Password"
				styles={{ input: { fontSize: 16 } }}
			/>
			<TextInput
				{...getInputProps(passwordConfirmation, { type: "password" })}
				error={passwordConfirmation.errors?.toString()}
				label="Confirmation"
				styles={{ input: { fontSize: 16 } }}
			/>
			<Button disabled={isPending} type="submit">
				Create My Account
			</Button>
		</Stack>
	);
};
