import { Box, Stack } from "@mantine/core";
import { Suspense } from "react";

import { User } from "./_user";

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
		</Stack>
	);
}
