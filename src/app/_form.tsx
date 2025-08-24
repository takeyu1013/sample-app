"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Alert, Button, Input, Stack, Textarea } from "@mantine/core";
import { useActionState } from "react";
import { usePreventDefault } from "@/lib/hook";
import { createMicropostAction } from "./_action";

export const Form = () => {
	const [lastResult, action, isPending] = useActionState(
		createMicropostAction,
		undefined,
	);
	const [form, { content }] = useForm({
		defaultValue: { content: "" },
		lastResult,
	});
	usePreventDefault(form.id);
	const errorResult = form.errors?.at(0);

	return (
		<Stack
			gap="xs"
			renderRoot={(props) => (
				<form {...props} {...getFormProps(form)} action={action} />
			)}
		>
			{errorResult && <Alert color="red">{errorResult}</Alert>}
			<Textarea
				{...getInputProps(content, { type: "text" })}
				error={content.errors?.toString()}
				resize="vertical"
				styles={{ input: { fontSize: 16 } }}
			/>
			<Input styles={{ input: { border: 0, padding: 0 } }} type="file" />
			<Button disabled={isPending} type="submit">
				Post
			</Button>
		</Stack>
	);
};
