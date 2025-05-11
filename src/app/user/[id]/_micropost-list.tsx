import { Anchor, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { listMicropost, readUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";
import Link from "next/link";

export const MicropostList = async ({
	params,
}: { params: Promise<{ id: string }> }) => {
	const headerMap = await headers();
	const result = await auth.api.getSession({ headers: headerMap });
	if (!result) {
		redirect("/login");
	}

	const { id } = await params;
	const [{ list, total }, { name }] = await Promise.all([
		listMicropost({ userId: id }),
		readUser({ id }),
	]);

	return (
		<Stack flex={1} gap="xs">
			<Title fw={500} lh={1} order={3} size={24}>
				Micropost list ({total})
			</Title>
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
								src={`https://secure.gravatar.com/avatar/${getGravaterId(result.user.email)}`}
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
		</Stack>
	);
};
