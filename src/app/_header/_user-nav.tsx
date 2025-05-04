import { Box } from "@mantine/core";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { AccountMenu } from "./_account-menu";
import { LogInLink } from "./_log-in-link";
import { UserLink } from "./_user-link";

export const UserNav = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	return session ? (
		<>
			<Box component="li" style={{ listStyle: "none" }}>
				<UserLink />
			</Box>
			<Box component="li" style={{ listStyle: "none" }}>
				<AccountMenu id={session.user.id} />
			</Box>
		</>
	) : (
		<Box component="li" style={{ listStyle: "none" }}>
			<LogInLink />
		</Box>
	);
};
