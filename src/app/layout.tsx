import {
	AppShell,
	AppShellMain,
	ColorSchemeScript,
	Container,
	MantineProvider,
	Stack,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { fullTitle } from "@/lib/service";

import { Footer } from "./_footer";
import { Header } from "./_header";

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
				<NuqsAdapter>
					<MantineProvider theme={{ activeClassName: "" }}>
						<AppShell
							header={{ height: 50 }}
							styles={{
								footer: { position: "static" },
								main: { minHeight: "100%" },
							}}
						>
							<Header />
							<Container size="lg">
								<Stack gap="xl">
									<AppShellMain>{children}</AppShellMain>
									<Footer />
								</Stack>
							</Container>
						</AppShell>
					</MantineProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
