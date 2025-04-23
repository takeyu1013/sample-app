import {
	AppShell,
	AppShellHeader,
	AppShellMain,
	ColorSchemeScript,
	Container,
	MantineProvider,
	Stack,
	Title,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fullTitle } from "@/lib/service";

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
								<Stack h="100%" justify="center">
									<Title c="#fff" order={1} size="h2">
										SAMPLE APP
									</Title>
								</Stack>
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
