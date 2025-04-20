import Link from "next/link";
import { Suspense } from "react";

import { Form } from "./_form";
import { Micropost } from "./_micropost";
import { MicropostLink } from "./_micropost-link";

export default function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<main>
			<Suspense>
				<Micropost params={params} />
			</Suspense>
			<div>
				<Suspense>
					<MicropostLink params={params} />
				</Suspense>{" "}
				| <Link href="/micropost">Back to micropost list</Link>
			</div>
			<Suspense>
				<Form params={params} />
			</Suspense>
		</main>
	);
}
