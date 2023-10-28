import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "appwrite"; 
import { databases } from "@/appwrite/config";

const redis = new Redis({
  url: 'UPSTASH_REDIS_URL',
  token: 'UPSTASH_REDIS_TOKEN',
})
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, "5 s"),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("X-forwarded-for") ?? ""
  const result = await ratelimit.limit(ip)
  if (!result.success){
    return NextResponse.json({ success: false, message: "Too many requests! Please try again later" })
  }
  
  
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
      return NextResponse.json({ success: false, message: "Something went wrong! Your confession couldn't be added" });
    }
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, message: "You are not allowed to send empty confessions. Don't be a wuss and confess something!" });
}
