import {
	Anchor,
	AppShellHeader,
	Box,
	Burger,
	Container,
	Flex,
	Group,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from "@mantine/core";
import Link from "next/link";
import { type ComponentProps, Suspense } from "react";

import { Logo } from "./_logo";
import { UserMenu } from "./_user-menu";
import { UserMenuMobile } from "./_user-menu-mobile";
import classes from "./layout.module.css";

export const Header = () => {
	const staticMenuList = [
		["Home", "/"],
		["Help", "/help"],
	] as const satisfies [string, ComponentProps<typeof Link>["href"]][];

	return (
		<AppShellHeader bg="dark">
			<Container h="100%" size="lg">
				<Flex align="center" h="100%" rowGap="xs" justify="space-between">
					<Logo />
					<Box component="nav">
						<Menu width="100%">
							<MenuTarget>
								<Burger color="white" hiddenFrom="sm" size="sm" />
							</MenuTarget>
							<MenuDropdown
								px="md"
								py="xs"
								bg="dark"
								left={0}
								style={{
									border: "none",
									borderTop: "1px solid var(--mantine-color-dark-2)",
									borderRadius: 0,
								}}
							>
								{staticMenuList.map(([name, href]) => (
									<MenuItem
										className={classes.menuItem}
										component="li"
										key={name}
										px={0}
										py="xs"
										style={{ listStyle: "none" }}
									>
										<Anchor
											className={classes.headerAnchor}
											component={Link}
											display="block"
											href={href}
											size="sm"
											underline="never"
										>
											{name}
										</Anchor>
									</MenuItem>
								))}
								<Suspense>
									<UserMenuMobile />
								</Suspense>
							</MenuDropdown>
						</Menu>
						<Group component="ul" gap="xl" m={0} p={0} visibleFrom="sm">
							{staticMenuList.map(([name, href]) => (
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
