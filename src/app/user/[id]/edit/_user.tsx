import { readUser } from "@/lib/router";

import { Form } from "./_form";

export const User = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const { email, name } = await readUser({ id });

	return <Form id={id} email={email} name={name} />;
};
