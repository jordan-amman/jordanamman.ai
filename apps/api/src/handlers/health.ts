import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { json } from "../lib/response.js";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return json(200, {
    ok: true,
    service: "jordanamman-ai-api",
    timestamp: new Date().toISOString()
  });
};
