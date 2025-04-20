import Link from "next/link";
import { Suspense } from "react";

import { Micropost } from "./_micropost";
import { MicropostLink } from "./_micropost-link";

export default function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<main>
			<h1>Editing micropost</h1>
			<Suspense>
				<Micropost params={params} />
			</Suspense>
			<br />
			<div>
				<Suspense>
					<MicropostLink params={params} />
				</Suspense>{" "}
				| <Link href="/micropost">Back to micropost list</Link>
			</div>
		</main>
	);
}
