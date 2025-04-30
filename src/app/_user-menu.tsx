import { Anchor, Button } from "@mantine/core";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import classes from "./layout.module.css";

export const UserMenu = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	return session ? (
		<Button
			className={classes.headerAnchor}
			display="block"
			fw={400}
			onClick={async () => {
				"use server";
				await auth.api.signOut({ headers: await headers() });
			}}
			bd="none"
			h="auto"
			lh="sm"
			p={0}
			size="sm"
			variant="transparent"
		>
			Log out
		</Button>
	) : (
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
	);
};
