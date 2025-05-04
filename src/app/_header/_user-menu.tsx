import { MenuItem } from "@mantine/core";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { AccountMenu } from "./_account-menu";
import { LogInLink } from "./_log-in-link";
import { UserLink } from "./_user-link";
import classes from "./header.module.css";

export const UserMenu = async () => {
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
				<UserLink />
			</MenuItem>
			<MenuItem
				component="li"
				className={classes.menuItem}
				closeMenuOnClick={false}
				px={0}
				py="xs"
				style={{ listStyle: "none" }}
			>
				<AccountMenu id={session.user.id} />
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
			<LogInLink />
		</MenuItem>
	);
};
