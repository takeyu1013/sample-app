import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fullTitle } from "@/lib/service";

import "./global.css";

export const metadata = {
	title: fullTitle(),
} as const satisfies Metadata;

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
