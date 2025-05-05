import { Anchor, Box, Button, Divider, Group, Stack } from "@mantine/core";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { listUser } from "@/lib/router";
import { getGravaterId } from "@/lib/service";

import { UserPagination } from "./_user-pagination";

const limit = 30 as const;

export const UserList = async ({
	searchParams,
}: { searchParams: Promise<{ page?: string }> }) => {
	const headerMap = await headers();
	const result = await auth.api.getSession({ headers: headerMap });
	if (!result) {
		redirect("/login");
	}

	const { data } = z
		.object({ page: z.coerce.number() })
		.safeParse(await searchParams);
	const page = data ? data.page : 1;
	const offset = page - 1 * limit;
	const { list, total } = await listUser({ limit, offset });
	const pageSize = Math.ceil(total / limit);

	const isAdmin = result.user.role === "admin";

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
							<Box>
								<Anchor component={Link} href={`/user/${id}`}>
									{name}
								</Anchor>
								{isAdmin && (
									<>
										{" "}
										|{" "}
										<Button
											fw="normal"
											h="auto"
											lh="md"
											onClick={async () => {
												"use server";
												await auth.api.removeUser({
													body: { userId: id },
													headers: headerMap,
												});
												revalidatePath("/user");
											}}
											p={0}
											size="md"
											variant="transparent"
										>
											delete
										</Button>
									</>
								)}
							</Box>
						</Group>
						<Divider />
					</Stack>
				))}
			</Stack>
		</UserPagination>
	);
};
