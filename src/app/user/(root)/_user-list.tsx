import { Anchor, Divider, Group, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { listUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";

import { UserPagination } from "./_user-pagination";

export const UserList = async ({
	searchParams,
}: { searchParams: Promise<{ page?: string }> }) => {
	const { data } = z
		.object({ page: z.coerce.number() })
		.safeParse(await searchParams);
	const page = data ? data.page : 1;
	const limit = 30 as const;
	const { list, total } = await listUser({ limit, offset: page - 1 * limit });
	const pageSize = Math.ceil(total / limit);

	return (
		<UserPagination total={pageSize}>
			<Stack component="ul" m={0} pl={40} gap="xs">
				{list.map(({ email, id, name }) => (
					<Stack component="li" gap="xs" key={id}>
						<Group align="start" gap="xs">
							<Image
								alt={name}
								height={50}
								width={50}
								src={`https://secure.gravatar.com/avatar/${getGravaterId(email)}`}
							/>
							<Anchor component={Link} href={`/user/${id}`}>
								{name}
							</Anchor>
						</Group>
						<Divider />
					</Stack>
				))}
			</Stack>
		</UserPagination>
	);
};
