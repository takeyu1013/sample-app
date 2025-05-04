"use client";

import { Pagination, Stack } from "@mantine/core";
import { parseAsInteger, useQueryState } from "nuqs";
import {
	type ComponentProps,
	type PropsWithChildren,
	useTransition,
} from "react";

export const UserPagination = ({
	children,
	total,
}: PropsWithChildren<Pick<ComponentProps<typeof Pagination>, "total">>) => {
	const [isLoading, startTransition] = useTransition();
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withOptions({ shallow: false, startTransition }),
	);

	return (
		<Stack gap="xl">
			<Pagination
				disabled={isLoading}
				onChange={(value) =>
					startTransition(() => {
						setPage(value);
					})
				}
				total={total}
				value={page ?? undefined}
			/>
			{children}
			<Pagination
				disabled={isLoading}
				onChange={(value) =>
					startTransition(() => {
						setPage(value);
					})
				}
				total={total}
				value={page ?? undefined}
			/>
		</Stack>
	);
};
