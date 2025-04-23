import type { Metadata } from "next";

import { fullTitle } from "@/lib/service";

export const metadata = {
	title: fullTitle("Help"),
} as const satisfies Metadata;

export default function Page() {
	return (
		<main>
			<h1>Help</h1>
			<p>
				Get help on the Ruby on Rails Tutorial at the{" "}
				<a href="https://railstutorial.jp/help">Rails Tutorial Help page</a>. To
				get help on this sample app, see the{" "}
				<a href="https://railstutorial.jp/#ebook">
					<em>Ruby on Rails Tutorial</em> book
				</a>
				.
			</p>
		</main>
	);
}
