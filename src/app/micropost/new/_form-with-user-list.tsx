import { listUser } from "@/lib/router";

import { Form } from "./_form";

export const FormWithUserList = async () => {
	const userList = await listUser();

	return <Form userList={userList} />;
};
