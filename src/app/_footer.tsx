import { Anchor, AppShellFooter, Box, Flex, Text } from "@mantine/core";
import Link from "next/link";
import type { ComponentProps } from "react";

import classes from "./layout.module.css";

export const Footer = () => (
	<AppShellFooter py={5}>
		<Flex
			direction={{ base: "column", sm: "row" }}
			justify={{ base: "start", sm: "space-between" }}
			rowGap="xs"
		>
			<Text c="dark.3" size="xs">
				The Ruby on Rails Tutorial by Michael Hartl
			</Text>
			<Flex
				columnGap="md"
				component="ul"
				direction={{ base: "column", sm: "row" }}
				m={0}
				p={0}
				rowGap="xs"
			>
				{(
					[
						["About", "#"],
						["Contact", "#"],
						["News", "#"],
					] satisfies [string, ComponentProps<typeof Link>["href"]][]
				).map(([name, href]) => (
					<Box
						component="li"
						key={name}
						style={{ listStyle: "none", lineHeight: "normal" }}
					>
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
			</Flex>
		</Flex>
	</AppShellFooter>
);
