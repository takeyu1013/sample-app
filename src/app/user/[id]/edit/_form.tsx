"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";

import { usePreventDefault } from "@/lib/hook";

import { updateUserAction } from "./_action";

export const Form = ({
	email: defaultEmail,
	name: defaultName,
}: { email: string; name: string }) => {
	const [lastResult, action, isPending] = useActionState(
		updateUserAction,
		undefined,
	);
	const [form, { email, name, password, passwordConfirmation }] = useForm({
		defaultValue: {
			email: defaultEmail,
			name: defaultName,
			password: "",
			passwordConfirmation: "",
		},
		lastResult,
	});
	usePreventDefault(form.id);

	return (
		<Stack
			renderRoot={(props) => (
				<form {...props} {...getFormProps(form)} action={action} />
			)}
		>
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
				Save changes
			</Button>
		</Stack>
	);
};
