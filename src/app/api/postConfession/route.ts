import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "appwrite";
import { databases } from "@/appwrite/config";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, "60 s"),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("X-forwarded-for") ?? ""
  const result = await ratelimit.limit(ip)

  console.log(result.limit)
  console.log(result.remaining)
  if (!result.success) {
    return new NextResponse(JSON.stringify({ success: false, message: "Too many requests! Please try again later" }), {
      status: 429,
    })
  }


  const confession = await request.json();
  if (confession.length != 0) {
    try {
      await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, ID.unique(), {
        confession: confession,
        comments: []
      })
    }
    catch (err) {
      console.log(err)
      return NextResponse.json(JSON.stringify({ success: false, message: "Something went wrong! Your confession couldn't be added" }), {
        status: 500
      });
    }
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining)
      }
    });
  }
  return NextResponse.json({ success: false, message: "You are not allowed to send empty confessions. Don't be a wuss and confess something!" });
}
