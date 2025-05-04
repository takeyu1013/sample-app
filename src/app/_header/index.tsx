import {
	AppShellHeader,
	Box,
	Burger,
	Container,
	Group,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from "@mantine/core";
import type Link from "next/link";
import { type ComponentProps, Suspense } from "react";

import { CustomLink } from "./_custom-link";
import { Logo } from "./_logo";
import { UserMenu } from "./_user-menu";
import { UserNav } from "./_user-nav";
import classes from "./header.module.css";

export const Header = () => {
	const staticNavItemList = [
		["Home", "/"],
		["Help", "/help"],
	] as const satisfies [string, ComponentProps<typeof Link>["href"]][];

	return (
		<AppShellHeader bg="dark">
			<Container h="100%" size="lg">
				<Group h="100%" justify="space-between">
					<Logo />
					<Box component="nav">
						<Box hiddenFrom="sm">
							<Menu width="100%">
								<MenuTarget>
									<Burger color="white" size="sm" />
								</MenuTarget>
								<MenuDropdown
									bg="dark"
									component="ul"
									left={0}
									m={0}
									px="md"
									py="xs"
									style={{
										border: "none",
										borderTop: "1px solid var(--mantine-color-dark-2)",
										borderRadius: 0,
									}}
								>
									{staticNavItemList.map(([name, href]) => (
										<MenuItem
											className={classes.menuItem}
											component="li"
											key={name}
											px={0}
											py="xs"
											style={{ listStyle: "none" }}
										>
											<CustomLink href={href}>{name}</CustomLink>
										</MenuItem>
									))}
									<Suspense>
										<UserMenu />
									</Suspense>
								</MenuDropdown>
							</Menu>
						</Box>
						<Group component="ul" gap="xl" m={0} p={0} visibleFrom="sm">
							{staticNavItemList.map(([name, href]) => (
								<Box component="li" key={name} style={{ listStyle: "none" }}>
									<CustomLink href={href}>{name}</CustomLink>
								</Box>
							))}
							<Suspense>
								<UserNav />
							</Suspense>
						</Group>
					</Box>
				</Group>
			</Container>
		</AppShellHeader>
	);
};
