import Link from "next/link";

import { Form } from "./_form";

export default function Page() {
	return (
		<main>
			<h1>New user</h1>
			<Form />
			<br />
			<Link href="/user">Back to user list</Link>
		</main>
	);
}
