import { Anchor, Text } from "@mantine/core";
import type { Metadata } from "next";

import { fullTitle } from "@/lib/service";

export const metadata = {
	title: fullTitle("Help"),
} as const satisfies Metadata;

export default function Page() {
	return (
		<Text>
			Get help on the Ruby on Rails Tutorial at the{" "}
			<Anchor href="https://railstutorial.jp/help">
				Rails Tutorial Help page
			</Anchor>
			. To get help on this sample app, see the{" "}
			<Anchor href="https://railstutorial.jp/#ebook">
				<Text fs="italic" span>
					Ruby on Rails Tutorial
				</Text>{" "}
				book
			</Anchor>
			.
		</Text>
	);
}
