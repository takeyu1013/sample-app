import {
	Anchor,
	AppShell,
	AppShellHeader,
	AppShellMain,
	Box,
	ColorSchemeScript,
	Container,
	Divider,
	Group,
	MantineProvider,
	Stack,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { fullTitle } from "@/lib/service";

import { FooterContent } from "./_footer-content";
import { FooterMenu } from "./_footer-menu";
import { Logo } from "./_logo";
import { MobileMenu } from "./_mobile-menu";
import classes from "./layout.module.css";

export const metadata = {
	title: fullTitle(),
} as const satisfies Metadata;

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	const headerMenuList = [
		["Home", "/"],
		["Help", "#"],
		["Log in", "#"],
	] as const satisfies ComponentProps<typeof MobileMenu>["list"];

	return (
		<html lang="ja" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<AppShell header={{ height: 50, offset: true }}>
						<AppShellHeader bg="dark">
							<Group
								h="100%"
								hiddenFrom="sm"
								justify="space-between"
								p="sm"
								style={{ flexWrap: "nowrap" }}
							>
								<Logo />
								<MobileMenu list={headerMenuList} />
							</Group>
							<Container h="100%" size="lg">
								<Group
									h="100%"
									visibleFrom="sm"
									justify="space-between"
									style={{ flexWrap: "nowrap" }}
								>
									<Logo />
									<Box component="nav">
										<Group component="ul" gap="xl">
											{headerMenuList.map(([name, href]) => (
												<Box
													component="li"
													key={name}
													style={{ listStyle: "none" }}
												>
													<Anchor
														className={classes.headerAnchor}
														component={Link}
														href={href}
														size="sm"
														underline="never"
													>
														{name}
													</Anchor>
												</Box>
											))}
										</Group>
									</Box>
								</Group>
							</Container>
						</AppShellHeader>
						<AppShellMain>
							<Container size="lg">
								<Stack gap="xl">
									{children}
									<Stack component="footer" gap={5}>
										<Divider />
										<Stack hiddenFrom="sm">
											<FooterContent />
											<FooterMenu />
										</Stack>
										<Group justify="space-between" visibleFrom="sm">
											<FooterContent />
											<Group>
												<FooterMenu />
											</Group>
										</Group>
									</Stack>
								</Stack>
							</Container>
						</AppShellMain>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
