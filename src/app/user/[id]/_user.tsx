import { Group, Title } from "@mantine/core";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { readUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";

export const User = async ({ params }: { params: Promise<{ id: string }> }) => {
	const headerMap = await headers();
	const result = await auth.api.getSession({ headers: headerMap });
	if (!result) {
		redirect("/login");
	}

	const { id } = await params;
	const { email, name } = await readUser({ id });

	return (
		<Group align="start" gap="xs">
			<Image
				alt="Michael Hartl"
				height={80}
				width={80}
				src={`https://secure.gravatar.com/avatar/${getGravaterId(email)}`}
			/>
			<Title fw={500} fz={20} lh={1}>
				{name}
			</Title>
		</Group>
	);
};
