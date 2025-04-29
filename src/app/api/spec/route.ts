import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import type { Swagger } from "atlassian-openapi";
import { isErrorResult, merge } from "openapi-merge";

import { auth } from "@/lib/auth";
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
	const authSchema = await auth.api.generateOpenAPISchema();

	const mergeResult = merge([
		{
			oas: spec as Swagger.SwaggerV3,
		},
		{
			oas: authSchema as Swagger.SwaggerV3,
			pathModification: { prepend: "/auth" },
		},
	]);
	if (isErrorResult(mergeResult))
		return new Response(JSON.stringify(spec), {
			headers: {
				"Content-Type": "application/json",
			},
		});

	return new Response(JSON.stringify(mergeResult.output), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
