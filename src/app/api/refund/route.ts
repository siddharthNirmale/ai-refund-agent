import { NextResponse } from "next/server";

const HF_TOKEN = process.env.HF_TOKEN;

const MODEL_URL =
  "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: message,
      }),
    });

    const data = await response.json();

    console.log("HF Response:");
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}