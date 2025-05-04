import { listUser, readMicropost } from "@/lib/router";

import { Form } from "./_form";

export const Micropost = async ({
	params,
}: { params: Promise<{ id: string }> }) => {
	const [{ id }, { list }] = await Promise.all([params, listUser()]);
	const { content, userId } = await readMicropost({ id });

	return <Form id={id} content={content} userId={userId} userList={list} />;
};
