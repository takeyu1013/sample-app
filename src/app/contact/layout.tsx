import "@mantine/core/styles.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { PageLayout } from "@/component/page-layout";
import { fullTitle } from "@/lib/service";

const TITLE = "Contact" as const;

export const metadata = {
	title: fullTitle(TITLE),
} as const satisfies Metadata;

export default function Layout({ children }: Readonly<PropsWithChildren>) {
	return <PageLayout title={TITLE}>{children}</PageLayout>;
}
