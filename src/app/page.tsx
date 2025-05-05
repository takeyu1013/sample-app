import { Anchor, Button, Card, Center, Stack, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const title = "Welcome to the Sample App";

	return (
		<Stack gap="xl" py="xs">
			<Card bg="gray.2" p={48} radius="md">
				<Center>
					<Stack align="center" gap="lg">
						<Title hiddenFrom="md" style={{ fontWeight: 500 }}>
							{title}
						</Title>
						<Title visibleFrom="md" style={{ fontSize: 63, fontWeight: 500 }}>
							{title}
						</Title>
						<Title order={2} size="h5" style={{ fontWeight: 500 }}>
							This is the home page for the{" "}
							<Anchor href="https://railstutorial.jp/">
								Ruby on Rails Tutorial
							</Anchor>{" "}
							sample application.
						</Title>
						<Button component={Link} href="/signup" radius="md" size="lg">
							Sign up now!
						</Button>
					</Stack>
				</Center>
			</Card>
			<Image alt="rails" height={70} width={200} src="rails.svg" />
			<Stack>
				<Link href="/micropost">Micropost list</Link>
				<Link href="/api">Sample App API doc</Link>
				<Link href="/api/auth/reference">Auth API doc</Link>
			</Stack>
		</Stack>
	);
}
