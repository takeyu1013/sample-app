import { readUser } from "@/lib/router";
import { Group, Title } from "@mantine/core";
import Image from "next/image";

export const User = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const { name } = await readUser({ id });

	return (
		<Group align="start" gap="xs">
			<Image
				alt="Michael Hartl"
				height={80}
				width={80}
				src="https://secure.gravatar.com/avatar/03ea78c0884c9ac0f73e6af7b9649e90"
			/>
			<Title fw={500} fz={20} lh={1}>
				{name}
			</Title>
		</Group>
	);
};
