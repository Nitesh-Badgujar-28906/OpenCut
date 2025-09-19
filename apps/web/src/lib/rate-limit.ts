// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const baseRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
  analytics: true,
  prefix: "rate-limit",
});

export async function checkRateLimit({ request }: { request: Request }) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await baseRateLimit.limit(ip);
  return { success, limited: !success };
}
