import { Anchor, Text } from "@mantine/core";

export default function Page() {
	return (
		<Text>
			<Anchor href="https://railstutorial.jp/">Ruby on Rails Tutorial</Anchor>{" "}
			is a <Anchor href="https://railstutorial.jp/#ebook">book</Anchor> and{" "}
			<Anchor href="https://railstutorial.jp/screencast">screencast</Anchor> to
			teach web development with{" "}
			<Anchor href="https://rubyonrails.org/">Ruby on Rails</Anchor>. This is
			the sample application for the tutorial.
		</Text>
	);
}
