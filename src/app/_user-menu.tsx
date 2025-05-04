import {
	Anchor,
	Box,
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

import classes from "./layout.module.css";

export const UserMenu = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	return session ? (
		<>
			<Box component="li" style={{ listStyle: "none" }}>
				<Anchor
					className={classes.headerAnchor}
					component={Link}
					display="block"
					href="#"
					size="sm"
					underline="never"
				>
					User
				</Anchor>
			</Box>
			<Box component="li" style={{ listStyle: "none" }}>
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
						<MenuItem component={Link} href={`/user/${session.user.id}`}>
							Profile
						</MenuItem>
						<MenuItem component={Link} href={`/user/${session.user.id}/edit`}>
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
			</Box>
		</>
	) : (
		<Box component="li" style={{ listStyle: "none" }}>
			<Anchor
				className={classes.headerAnchor}
				component={Link}
				display="block"
				href="/login"
				size="sm"
				underline="never"
			>
				Log in
			</Anchor>
		</Box>
	);
};
