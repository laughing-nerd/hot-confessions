import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/appwrite/config";

export async function POST(request: NextRequest){
  const req = await request.json();
  try{
    const doc = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, req.id)
    const comments = await doc.comments
    comments.reverse()
    comments.push(req.comment)
    comments.reverse()
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, req.id, { comments: comments })
    return NextResponse.json({ success: true })
  }
  catch(err){
    return NextResponse.json({ success: false })
  }

}
