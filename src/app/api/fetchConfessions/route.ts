import { NextResponse } from "next/server";
import { databases } from "@/appwrite/config";
import { Query } from "appwrite";

export async function GET() {
  const info = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, [ Query.orderDesc("$createdAt") ])
  return NextResponse.json(info.documents);
}
