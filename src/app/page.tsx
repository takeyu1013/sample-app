import Link from "next/link";

export default function Home() {
	return (
		<main>
			<h1>Home</h1>
			<p>
				<Link href="/user">User list</Link>
			</p>
			<p>
				<Link href="/micropost">Micropost list</Link>
			</p>
			<p>
				<Link href="/api/spec/doc">API doc</Link>
			</p>
		</main>
	);
}
