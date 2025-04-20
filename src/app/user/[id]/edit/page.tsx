import Link from "next/link";
import { Suspense } from "react";

import { User } from "./_user";
import { UserLink } from "./_user-link";

export default function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<main>
			<h1>Editing user</h1>
			<Suspense>
				<User params={params} />
			</Suspense>
			<br />
			<div>
				<Suspense>
					<UserLink params={params} />
				</Suspense>{" "}
				| <Link href="/user">Back to user list</Link>
			</div>
		</main>
	);
}
