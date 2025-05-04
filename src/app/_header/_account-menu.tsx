import {
	Button,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from "@mantine/core";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import classes from "./header.module.css";

export const AccountMenu = async ({ id }: { id: string }) => (
	<Menu offset={16} position="bottom-end" width={160}>
		<MenuTarget>
			<Button
				bd="none"
				className={classes.headerAnchor}
				display="block"
				fw={400}
				h="auto"
				lh="sm"
				p={0}
				variant="transparent"
			>
				Account
			</Button>
		</MenuTarget>
		<MenuDropdown>
			<MenuItem component={Link} href={`/user/${id}`}>
				Profile
			</MenuItem>
			<MenuItem component={Link} href={`/user/${id}/edit`}>
				Settings
			</MenuItem>
			<MenuDivider />
			<MenuItem
				onClick={async () => {
					"use server";
					await auth.api.signOut({ headers: await headers() });
				}}
			>
				Log out
			</MenuItem>
		</MenuDropdown>
	</Menu>
);
