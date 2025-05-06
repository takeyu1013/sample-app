import {
	Anchor,
	Button,
	Card,
	Center,
	Flex,
	Group,
	Stack,
	Title,
} from "@mantine/core";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { auth } from "@/lib/auth";
import { getGravaterId } from "@/lib/service";

import { Form } from "./_form";
import { MicropostCount } from "./_micropost-count";
import { MicropostList } from "./_micropost-list";

export const Home = async () => {
	const result = await auth.api.getSession({ headers: await headers() });
	const title = "Welcome to the Sample App";

	return result ? (
		<Flex
			component="section"
			direction={{ base: "column", sm: "row" }}
			py="xl"
			rowGap="xl"
			columnGap="xl"
		>
			<Stack flex={`0 0 ${100 / 3}%`} gap="xl">
				<Group align="start" gap="xs">
					<Image
						alt="avater"
						height={50}
						width={50}
						src={`https://secure.gravatar.com/avatar/${getGravaterId(result.user.email)}`}
					/>
					<Stack gap={0}>
						<Title fw={500} fz={20} lh={1}>
							{result.user.name}
						</Title>
						<Anchor
							component={Link}
							href={`/user/${result.session.userId}`}
							size="sm"
						>
							view my profile
						</Anchor>
						<Suspense>
							<MicropostCount userId={result.session.userId} />
						</Suspense>
					</Stack>
				</Group>
				<Form />
			</Stack>
			<Stack flex={1} gap="xs">
				<Title fw={500} lh={1} order={3} size={24}>
					Micropost Feed
				</Title>
				<MicropostList userId={result.session.userId} />
			</Stack>
		</Flex>
	) : (
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
};
