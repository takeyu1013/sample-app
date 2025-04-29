import {
	Anchor,
	AppShellHeader,
	Box,
	Burger,
	Container,
	Flex,
	Group,
} from "@mantine/core";
import Link from "next/link";
import { type ComponentProps, Suspense } from "react";

import { Logo } from "./_logo";
import type { MobileMenu } from "./_mobile-menu";
import { UserMenu } from "./_user-menu";
import classes from "./layout.module.css";

export const Header = () => {
	const headerMenuList = [
		["Home", "/"],
		["Help", "/help"],
	] as const satisfies ComponentProps<typeof MobileMenu>["list"];

	return (
		<AppShellHeader bg="dark">
			<Container h="100%" size="lg">
				<Flex align="center" h="100%" rowGap="xs" justify="space-between">
					<Logo />
					<Box component="nav">
						<Burger color="white" hiddenFrom="sm" size="sm" />
						<Group component="ul" gap="xl" m={0} p={0} visibleFrom="sm">
							{headerMenuList.map(([name, href]) => (
								<Box component="li" key={name} style={{ listStyle: "none" }}>
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
							<Suspense>
								<UserMenu />
							</Suspense>
						</Group>
					</Box>
				</Flex>
			</Container>
		</AppShellHeader>
	);
};
