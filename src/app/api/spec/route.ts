import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";

import { router } from "@/lib/router";

const openAPIGenerator = new OpenAPIGenerator({
	schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function GET(request: Request) {
	const spec = await openAPIGenerator.generate(router, {
		info: {
			title: "Sample App API",
			version: "1.0.0",
		},
		servers: [{ url: "/api" }],
	});

	return new Response(JSON.stringify(spec), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
