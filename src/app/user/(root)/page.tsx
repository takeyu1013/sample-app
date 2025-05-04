import { Suspense } from "react";

import { UserList } from "./_user-list";

export default function Page({
	searchParams,
}: { searchParams: Promise<{ page?: string }> }) {
	return (
		<Suspense>
			<UserList searchParams={searchParams} />
		</Suspense>
	);
}
