import Link from "next/link";

import { auth } from "@/lib/auth";
import { listMicropost } from "@/lib/router";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const MicropostList = async () => {
	const headerMap = await headers();
	const result = await auth.api.getSession({ headers: headerMap });
	if (!result) {
		redirect("/login");
	}

	const { list } = await listMicropost({ userId: result.session.userId });

	return (
		<div>
			{list.map(({ content, id, userId }) => (
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
