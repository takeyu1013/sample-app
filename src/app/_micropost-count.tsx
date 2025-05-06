import { listMicropost } from "@/lib/router";
import { Text } from "@mantine/core";

export const MicropostCount = async ({ userId }: { userId: string }) => {
	const { total } = await listMicropost({ userId });
	return (
		<Text lh={1} size="sm">
			{total} microposts
		</Text>
	);
};
