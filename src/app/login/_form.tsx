"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Alert, Button, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";

import { usePreventDefault } from "@/lib/hook";
import { logInAction } from "./_action";

export const Form = () => {
	const [lastResult, action, isPending] = useActionState(
		logInAction,
		undefined,
	);
	const [form, { email, password }] = useForm({
		defaultValue: {
			email: "",
			password: "",
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
			<Button disabled={isPending} type="submit">
				Log in
			</Button>
		</Stack>
	);
};
