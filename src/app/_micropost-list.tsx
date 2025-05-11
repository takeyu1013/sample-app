import {
	Anchor,
	Box,
	Button,
	Divider,
	Group,
	Stack,
	Text,
} from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { deleteMicropost, listMicropost, readUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";

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
							<Box component="span" fz="sm" lh="sm">
								<Text c="dimmed" size="sm" span>
									Posted {formatDistanceToNow(createdAt)} ago.
								</Text>{" "}
								<Button
									bd={0}
									fw="normal"
									h="auto"
									lh="sm"
									onClick={async () => {
										"use server";
										await deleteMicropost({ params: { id } });
										revalidatePath("/");
									}}
									p={0}
									size="sm"
									variant="transparent"
								>
									delete
								</Button>
							</Box>
						</Stack>
					</Group>
				</Stack>
			))}
		</Stack>
	);
};
