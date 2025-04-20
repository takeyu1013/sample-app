import Link from "next/link";

import { listUser } from "@/lib/router";

export const UserList = async () => {
	const userList = await listUser();

	return (
		<div>
			{userList.map(({ email, id, name }) => (
				<div key={id}>
					<p>
						<strong>Name: </strong>
						{name}
					</p>
					<p>
						<strong>Email: </strong>
						{email}
					</p>
					<p>
						<Link href={`/user/${id}`}>Show this user</Link>
					</p>
				</div>
			))}
		</div>
	);
};
