import { NextResponse } from "next/server";
import { smartMatches } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ smartMatches, score: 92 });
}
