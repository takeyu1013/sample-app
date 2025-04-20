import { redirect } from "next/navigation";

import { deleteMicropost } from "@/lib/router";

export const Form = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return (
		<form
			action={(async (id: string) => {
				"use server";
				await deleteMicropost({ params: { id } });
				redirect("/micropost");
			}).bind(null, id)}
		>
			<button type="submit">Delete this micropost</button>
		</form>
	);
};
