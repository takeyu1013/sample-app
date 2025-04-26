import { Center, Stack, Title } from "@mantine/core";
import type { PropsWithChildren } from "react";

export const PageLayout = ({
	children,
	title,
}: PropsWithChildren<{ title: string }>) => (
	<Stack gap="xl" py="lg">
		<Center>
			<Title fw={500} size={42}>
				{title}
			</Title>
		</Center>
		{children}
	</Stack>
);
