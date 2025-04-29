import { Anchor, AppShellHeader, Box, Container, Group } from "@mantine/core";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Logo } from "./_logo";
import { MobileMenu } from "./_mobile-menu";
import classes from "./layout.module.css";

export const Header = () => {
	const headerMenuList = [
		["Home", "/"],
		["Help", "/help"],
		["Log in", "/login"],
	] as const satisfies ComponentProps<typeof MobileMenu>["list"];

	return (
		<AppShellHeader bg="dark">
			<Group
				h="100%"
				hiddenFrom="sm"
				justify="space-between"
				p="sm"
				style={{ flexWrap: "nowrap" }}
			>
				<Logo />
				<MobileMenu list={headerMenuList} />
			</Group>
			<Container h="100%" size="lg">
				<Group
					h="100%"
					visibleFrom="sm"
					justify="space-between"
					style={{ flexWrap: "nowrap" }}
				>
					<Logo />
					<Box component="nav">
						<Group component="ul" gap="xl">
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
						</Group>
					</Box>
				</Group>
			</Container>
		</AppShellHeader>
	);
};
