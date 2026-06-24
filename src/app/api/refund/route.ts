import { NextResponse } from "next/server";

import { runRefundAgent } from "@/lib/agent/refundAgent";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const result =
    await runRefundAgent(
      body.customerId
    );

  return NextResponse.json(result);
}


