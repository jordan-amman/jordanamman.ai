import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { json } from "../lib/response.js";

const dynamo = new DynamoDBClient({});
const ses = new SESv2Client({});

const TABLE = process.env.CONTACT_TABLE_NAME!;
const FROM_EMAIL = process.env.SES_FROM_EMAIL!;
const TO_EMAIL = process.env.NOTIFICATION_EMAIL!;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
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

  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  await dynamo.send(
    new PutItemCommand({
      TableName: TABLE,
      Item: {
        id: { S: id },
        name: { S: payload.name! },
        email: { S: payload.email! },
        company: { S: payload.company ?? "" },
        projectType: { S: payload.projectType ?? "" },
        budget: { S: payload.budget ?? "" },
        message: { S: payload.message! },
        receivedAt: { S: receivedAt },
      },
    })
  );

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      Content: {
        Simple: {
          Subject: { Data: `New contact request from ${payload.name}` },
          Body: {
            Text: {
              Data: [
                `Name:          ${payload.name}`,
                `Email:         ${payload.email}`,
                `Company:       ${payload.company ?? "-"}`,
                `Project type:  ${payload.projectType ?? "-"}`,
                `Budget:        ${payload.budget ?? "-"}`,
                ``,
                `Message:`,
                payload.message,
              ].join("\n"),
            },
          },
        },
      },
    })
  );

  return json(202, {
    ok: true,
    message: "Thanks. Your request has been received.",
    receivedAt,
  });
};
