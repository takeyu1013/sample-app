import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { router } from "@/lib/router";

const handler = new OpenAPIHandler(router, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "Sample App API",
          version: "0.1.0",
        },
        components: {
          securitySchemes: {
            apiKeyCookie: {
              type: "apiKey",
              in: "cookie",
              name: "apiKeyCookie",
              description: "API Key authentication via cookie",
            },
          },
        },
      },
    }),
  ],
});

const handleRequest = async (request: Request) => {
  const { response } = await handler.handle(request, { prefix: "/api" });

  return response ?? new Response("Not found", { status: 404 });
};

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
