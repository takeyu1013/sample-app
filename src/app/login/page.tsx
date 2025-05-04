import { Anchor, Container, Text } from "@mantine/core";
import Link from "next/link";

import { Form } from "./_form";

export default function Page() {
	return (
		<Container p={0} size="xs" w="100%">
			<Form />
			<Text>
				New user?{" "}
				<Anchor component={Link} href="/signup">
					Sign up now!
				</Anchor>
			</Text>
		</Container>
	);
}
