import { Anchor, Center, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";

import { fullTitle } from "@/lib/service";

export const metadata = {
	title: fullTitle("About"),
} as const satisfies Metadata;

export default function Page() {
	return (
		<Stack gap="xl" py="lg">
			<Center>
				<Title fw={500} size={42}>
					About
				</Title>
			</Center>
			<Text>
				<Anchor href="https://railstutorial.jp/">Ruby on Rails Tutorial</Anchor>{" "}
				is a <Anchor href="https://railstutorial.jp/#ebook">book</Anchor> and{" "}
				<Anchor href="https://railstutorial.jp/screencast">screencast</Anchor>{" "}
				to teach web development with{" "}
				<Anchor href="https://rubyonrails.org/">Ruby on Rails</Anchor>. This is
				the sample application for the tutorial.
			</Text>
		</Stack>
	);
}
