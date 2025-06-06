import Link from "next/link";

export const UserLink = async ({
	params,
}: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return <Link href={`/user/${id}`}>Show this user</Link>;
};
