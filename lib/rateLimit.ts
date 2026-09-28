type Window = { count: number; resetAt: number };

const hits = new Map<string, Window>();

/**
 * Fixed-window, in-memory rate limiter. State lives in the serverless instance,
 * so limits are per instance — good enough to stop a single noisy client, not a
 * distributed attack (use Upstash/Vercel KV for that).
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  if (hits.size > 5000) {
    for (const [k, w] of hits) if (w.resetAt <= now) hits.delete(k);
  }

  const current = hits.get(key);
  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  current.count += 1;
  if (current.count > limit) {
    return { ok: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
