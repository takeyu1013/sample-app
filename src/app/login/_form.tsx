"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useActionState, useEffect } from "react";

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
