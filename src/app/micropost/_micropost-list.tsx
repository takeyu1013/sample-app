import Link from "next/link";

import { listMicropost } from "@/lib/router";

export const MicropostList = async () => {
	const micropostList = await listMicropost();

	return (
		<div>
			{micropostList.map(({ content, id, userId }) => (
				<div key={id}>
					<p>
						<strong>Content: </strong>
						{content}
					</p>
					<p>
						<strong>User: </strong>
						{userId}
					</p>
					<p>
						<Link href={`/micropost/${id}`}>Show this micropost</Link>
					</p>
				</div>
			))}
		</div>
	);
};
