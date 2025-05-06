import { Suspense } from "react";

import { Home } from "./_home";

export default function Page() {
	return (
		<Suspense>
			<Home />
		</Suspense>
	);
}
