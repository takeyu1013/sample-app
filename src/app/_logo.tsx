import { Anchor } from "@mantine/core";
import Link from "next/link";

export const Logo = () => (
	<Anchor
		c="white"
		component={Link}
		href="/"
		style={{ fontSize: 23.8, fontWeight: 700 }}
		underline="never"
	>
		SAMPLE APP
	</Anchor>
);
