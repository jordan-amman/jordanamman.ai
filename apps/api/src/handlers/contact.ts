import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { json } from "../lib/response.js";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  budget?: string;
};

function validate(payload: ContactPayload): string | null {
  if (!payload.name || payload.name.length < 2) return "Name is required";
  if (!payload.email || !payload.email.includes("@")) return "Valid email is required";
  if (!payload.message || payload.message.length < 10) return "Message is too short";
  return null;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const payload = event.body ? (JSON.parse(event.body) as ContactPayload) : {};
  const validationError = validate(payload);

  if (validationError) {
    return json(400, { ok: false, error: validationError });
  }

  // TODO: Persist the contact request to DynamoDB for lead tracking.
  // TODO: Trigger SES email notification or EventBridge workflow.
  return json(202, {
    ok: true,
    message: "Thanks. Your request has been received.",
    receivedAt: new Date().toISOString()
  });
};
