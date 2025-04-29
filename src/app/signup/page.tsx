import { Button, Container, Stack, TextInput } from "@mantine/core";

export default function Page() {
	return (
		<Container p={0} size="xs" w="100%">
			<Stack>
				<TextInput label="Name" />
				<TextInput label="Email" />
				<TextInput label="Password" />
				<TextInput label="Confirmation" />
				<Button>Create My Account</Button>
			</Stack>
		</Container>
	);
}
