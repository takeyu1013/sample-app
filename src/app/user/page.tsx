import Link from "next/link";
import { Suspense } from "react";

import { UserList } from "./_user-list";

export default function Home() {
	return (
		<main>
			<h1>User List</h1>
			<Suspense>
				<UserList />
			</Suspense>
			<Link href="/user/new">New user</Link>
		</main>
	);
}
