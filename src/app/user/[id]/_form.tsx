import { redirect } from "next/navigation";

import { deleteUser } from "@/lib/router";

export const Form = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return (
		<form
			action={(async (id: string) => {
				"use server";
				await deleteUser({ params: { id } });
				redirect("/user");
			}).bind(null, id)}
		>
			<button type="submit">Delete this user</button>
		</form>
	);
};
