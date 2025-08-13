// Alternative: Load environment variables from AWS Parameter Store
// Use this if Amplify env vars don't work

import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const client = new SSMClient({ region: process.env.AWS_REGION || "ap-south-1" });

export async function getParameter(name) {
  try {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: true
    });
    const response = await client.send(command);
    return response.Parameter.Value;
  } catch (error) {
    console.error(`Failed to get parameter ${name}:`, error);
    return null;
  }
}

// Usage example:
// const groqKey = await getParameter('/stackbinary/GROQ_API_KEY');