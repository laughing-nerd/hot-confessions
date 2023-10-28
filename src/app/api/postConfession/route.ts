import { NextRequest, NextResponse } from "next/server";
import { ID } from "appwrite"; 
import { databases } from "@/appwrite/config";

export async function POST(request: NextRequest) {
  const ip = request.ip
  const ip2 = request.headers.get("X-forwarded-for") ?? ""
  console.log(ip)
  console.log(ip2)
  
  const confession = await request.json();
  if (confession.length != 0){
    try{
      await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, ID.unique(), {
        confession: confession,
        comments: []
      })
    }
    catch(err){
      console.log(err)
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
