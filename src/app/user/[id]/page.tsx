import Link from "next/link";
import { Suspense } from "react";

import { Box, Stack } from "@mantine/core";
import { Form } from "./_form";
import { User } from "./_user";
import { UserLink } from "./_user-link";

export default function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<Stack component="aside" pt={30}>
			<Box component="section">
				<Suspense>
					<User params={params} />
				</Suspense>
			</Box>
			<div>
				<Suspense>
					<UserLink params={params} />
				</Suspense>{" "}
				| <Link href="/user">Back to user list</Link>
			</div>
			<Suspense>
				<Form params={params} />
			</Suspense>
		</Stack>
	);
}
