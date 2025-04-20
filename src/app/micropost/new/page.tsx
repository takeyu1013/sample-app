import Link from "next/link";

import { Suspense } from "react";
import { FormWithUserList } from "./_form-with-user-list";

export default function Page() {
	return (
		<main>
			<h1>New micropost</h1>
			<Suspense>
				<FormWithUserList />
			</Suspense>
			<br />
			<Link href="/micropost">Back to micropost list</Link>
		</main>
	);
}
