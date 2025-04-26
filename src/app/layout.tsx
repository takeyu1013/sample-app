import {
	Anchor,
	AppShell,
	AppShellHeader,
	AppShellMain,
	ColorSchemeScript,
	Container,
	Group,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { fullTitle } from "@/lib/service";

import classes from "./_layout.module.css";

export const metadata = {
	title: fullTitle(),
} as const satisfies Metadata;

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ja" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<AppShell header={{ height: 50, offset: true }}>
						<AppShellHeader bg="dark">
							<Container h="100%" size="lg">
								<Group h="100%" justify="space-between">
									<Anchor
										c="white"
										component={Link}
										href="/"
										style={{ fontSize: 23.8, fontWeight: 700 }}
										underline="never"
									>
										SAMPLE APP
									</Anchor>
									<Group gap="xl">
										{(
											[
												["Home", "/"],
												["Help", "#"],
												["Log in", "#"],
											] satisfies [
												string,
												ComponentProps<typeof Link>["href"],
											][]
										).map(([name, href]) => (
											<Anchor
												className={classes.anchor}
												component={Link}
												key={name}
												href={href}
												size="sm"
												underline="never"
											>
												{name}
											</Anchor>
										))}
									</Group>
								</Group>
							</Container>
						</AppShellHeader>
						<AppShellMain>
							<Container size="lg">{children}</Container>
						</AppShellMain>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
