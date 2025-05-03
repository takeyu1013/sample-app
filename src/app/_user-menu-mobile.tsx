import {
	Anchor,
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

export const UserMenuMobile = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	return session ? (
		<>
			<MenuItem
				className={classes.menuItem}
				component="li"
				px={0}
				py="xs"
				style={{ listStyle: "none" }}
			>
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
			</MenuItem>
			<MenuItem
				component="li"
				className={classes.menuItem}
				closeMenuOnClick={false}
				px={0}
				py="xs"
				style={{ listStyle: "none" }}
			>
				<Menu position="bottom-start" width={160}>
					<MenuTarget>
						<Button
							bd="none"
							className={classes.headerAnchor}
							display="block"
							fw={400}
							h="auto"
							lh="sm"
							p={0}
							w="100%"
							styles={{
								inner: { justifyContent: "flex-start" },
							}}
							variant="transparent"
						>
							Account
						</Button>
					</MenuTarget>
					<MenuDropdown>
						<MenuItem component={Link} href={`/user/${session.user.id}`}>
							Profile
						</MenuItem>
						<MenuItem component={Link} href="#">
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
			</MenuItem>
		</>
	) : (
		<MenuItem
			component="li"
			className={classes.menuItem}
			px={0}
			py="xs"
			style={{ listStyle: "none" }}
		>
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
		</MenuItem>
	);
};
