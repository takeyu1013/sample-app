import Link from "next/link";

export default function Home() {
	return (
		<main>
			<h1>Home</h1>
			<p>
				This is the home page for the{" "}
				<a href="https://railstutorial.jp/">Ruby on Rails Tutorial</a> sample
				application.
			</p>
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
