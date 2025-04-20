import Link from "next/link";

export const MicropostLink = async ({
	params,
}: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return <Link href={`/micropost/${id}`}>Show this micropost</Link>;
};
