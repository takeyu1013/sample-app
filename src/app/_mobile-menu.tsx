"use client";

import { Anchor, Box, Burger, Drawer, Stack } from "@mantine/core";
import Link from "next/link";
import { type ComponentProps, useReducer } from "react";

export const MobileMenu = ({
	list,
}: { list: [string, ComponentProps<typeof Link>["href"]][] }) => {
	const [opened, toggle] = useReducer((state) => !state, false);

	return (
		<>
			<Burger color="white" opened={opened} onClick={toggle} size="sm" />
			<Drawer
				opened={opened}
				onClose={toggle}
				withCloseButton={false}
				size="xs"
			>
				<Stack component="ul" m={0} p={0}>
					{list.map(([name, href]) => (
						<Box component="li" key={name} style={{ listStyle: "none" }}>
							<Anchor
								component={Link}
								href={href}
								onClick={toggle}
								underline="never"
							>
								{name}
							</Anchor>
						</Box>
					))}
				</Stack>
			</Drawer>
		</>
	);
};
