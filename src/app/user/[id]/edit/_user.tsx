import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { readUser } from "@/lib/router";

import { Form } from "./_form";

export const User = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		redirect("/login");
	}

	const {
		session: { userId },
	} = session;
	const { id } = await params;
	if (userId !== id) {
		redirect("/");
	}

	const { email, name } = await readUser({ id });

	return <Form email={email} name={name} />;
};
