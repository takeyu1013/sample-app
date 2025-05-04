import { listUser } from "@/lib/router";

import { Form } from "./_form";

export const FormWithUserList = async () => {
	const { list } = await listUser();

	return <Form userList={list} />;
};
