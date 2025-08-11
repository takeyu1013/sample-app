import { Container } from "@mantine/core";
import { Suspense } from "react";

import { User } from "./_user";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Container p={0} size="xs" w="100%">
			<Suspense>
				<User params={params} />
			</Suspense>
		</Container>
	);
}
