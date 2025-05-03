"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useActionState, useEffect } from "react";

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

	// https://github.com/edmundhung/conform/issues/681#issuecomment-2174388025
	useEffect(() => {
		const preventDefault = (event: Event) => {
			if (event.target === document.forms.namedItem(form.id)) {
				event.preventDefault();
			}
		};
		document.addEventListener("reset", preventDefault, true);
		return () => {
			document.removeEventListener("reset", preventDefault, true);
		};
	}, [form.id]);

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
				Create My Account
			</Button>
		</Stack>
	);
};
