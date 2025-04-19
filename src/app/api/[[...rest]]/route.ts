import { OpenAPIHandler } from "@orpc/openapi/fetch";

import { router } from "@/lib/router";

const handler = new OpenAPIHandler(router);

async function handleRequest(request: Request) {
	const { response } = await handler.handle(request, {
		prefix: "/api",
		context: {},
	});

	return response ?? new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
