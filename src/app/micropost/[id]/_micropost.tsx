import { readMicropost } from "@/lib/router";

export const Micropost = async ({
	params,
}: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const { content, userId } = await readMicropost({ id });

	return (
		<div>
			<p>
				<strong>Content: </strong>
				{content}
			</p>
			<p>
				<strong>User: </strong>
				{userId}
			</p>
		</div>
	);
};
