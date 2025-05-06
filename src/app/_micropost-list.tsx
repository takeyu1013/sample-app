import { Anchor, Divider, Group, Stack, Text } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

import { listMicropost, readUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";
import Link from "next/link";

export const MicropostList = async ({ userId }: { userId: string }) => {
	const [{ list }, { email, name }] = await Promise.all([
		listMicropost({ userId }),
		readUser({ id: userId }),
	]);

	return (
		<Stack
			align="start"
			component="ol"
			gap="xs"
			m={0}
			p={0}
			style={{ flex: 1 }}
		>
			{list.map(({ content, createdAt, id, userId }) => (
				<Stack component="li" gap="xs" key={id} w="100%">
					<Divider />
					<Group>
						<Image
							alt={userId}
							height={50}
							width={50}
							src={`https://secure.gravatar.com/avatar/${getGravaterId(email)}`}
						/>
						<Stack gap={0}>
							<Anchor component={Link} href={`/user/${userId}`} size="sm">
								{name}
							</Anchor>
							<Text size="sm">{content}</Text>
							<Text c="dimmed" size="sm">
								Posted {formatDistanceToNow(createdAt)} ago.
							</Text>
						</Stack>
					</Group>
				</Stack>
			))}
		</Stack>
	);
};
