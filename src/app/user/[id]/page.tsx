import { Flex, Stack } from "@mantine/core";
import { Suspense } from "react";

import { MicropostList } from "./_micropost-list";
import { User } from "./_user";

export default function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<Stack component="aside" pt={30}>
			<Flex
				columnGap="xl"
				component="section"
				direction={{ base: "column", sm: "row" }}
				rowGap="xl"
			>
				<Suspense>
					<User params={params} />
				</Suspense>
				<Suspense>
					<MicropostList params={params} />
				</Suspense>
			</Flex>
		</Stack>
	);
}
