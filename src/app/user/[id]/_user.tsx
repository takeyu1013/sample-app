import { readUser } from "@/lib/router";

export const User = async ({ id }: { id: string }) => {
	const { email, name } = await readUser({ id });

	return (
		<div>
			<div>
				<p>
					<strong>Name: </strong>
					{name}
				</p>
				<p>
					<strong>Email: </strong>
					{email}
				</p>
			</div>
		</div>
	);
};
