import Link from "next/link";
import { Suspense } from "react";

import { MicropostList } from "./_micropost-list";

export default function Page() {
	return (
		<main>
			<h1>Micropost List</h1>
			<Suspense>
				<MicropostList />
			</Suspense>
			<Link href="/micropost/new">New micropost</Link>
		</main>
	);
}
