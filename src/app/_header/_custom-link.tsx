import { Anchor } from "@mantine/core";
import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

import classes from "./header.module.css";

export const CustomLink = ({
	children,
	href,
}: PropsWithChildren<Pick<ComponentProps<typeof Link>, "href">>) => (
	<Anchor
		className={classes.headerAnchor}
		component={Link}
		display="block"
		href={href}
		size="sm"
		underline="never"
	>
		{children}
	</Anchor>
);
