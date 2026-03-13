import type { APIGatewayProxyResultV2 } from "aws-lambda";

type JsonValue = Record<string, unknown>;

export function json(statusCode: number, body: JsonValue): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    },
    body: JSON.stringify(body)
  };
}
