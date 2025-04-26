import { Anchor, Box } from "@mantine/core";
import Link from "next/link";
import type { ComponentProps } from "react";

import classes from "./layout.module.css";

export const FooterMenu = () => (
	<>
		{(
			[
				["About", "#"],
				["Contact", "#"],
				["News", "#"],
			] satisfies [string, ComponentProps<typeof Link>["href"]][]
		).map(([name, href]) => (
			<Box component="li" key={name} style={{ listStyle: "none" }}>
				<Anchor
					className={classes.footerAnchor}
					component={Link}
					href={href}
					size="sm"
				>
					{name}
				</Anchor>
			</Box>
		))}
	</>
);
