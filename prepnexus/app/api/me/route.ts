import { getCurrentUser } from "@/lib/actions/auth.action";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json(null, { status: 401 });
  return NextResponse.json(user);
}
