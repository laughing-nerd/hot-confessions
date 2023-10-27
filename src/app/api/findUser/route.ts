import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/appwrite/config";
import { Query } from "appwrite";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const info = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, req.userid)
  return NextResponse.json(info)

}
