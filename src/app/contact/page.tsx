import { Anchor, Center, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";

import { fullTitle } from "@/lib/service";

export const metadata = {
	title: fullTitle("Contact"),
} as const satisfies Metadata;

export default function Page() {
	return (
		<Stack gap="xl" py="lg">
			<Center>
				<Title fw={500} size={42}>
					Contact
				</Title>
			</Center>
			<Text>
				Contact the Ruby on Rails Tutorial about the sample app at the{" "}
				<Anchor href="https://railstutorial.jp/contact">contact page</Anchor>.
			</Text>
		</Stack>
	);
}
