import Link from "next/link";
import { Suspense } from "react";

import { User } from "./_user";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<main>
			<Suspense>
				<User id={id} />
			</Suspense>
			<Link href="/user">Back to user list</Link>
		</main>
	);
}
