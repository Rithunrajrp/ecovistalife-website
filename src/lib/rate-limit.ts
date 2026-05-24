const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  const requestTimestamps = rateLimitMap.get(ip) || [];
  
  // Filter out requests older than the window
  const requestsInWindow = requestTimestamps.filter((timestamp) => timestamp > windowStart);

  if (requestsInWindow.length >= limit) {
    return false; // Rate limit exceeded
  }

  requestsInWindow.push(now);
  rateLimitMap.set(ip, requestsInWindow);
  
  // Optional: prevent map from growing infinitely by cleaning up occasionally
  // (In a real app with high traffic you'd use a more robust strategy like node-cache or Redis)
  if (rateLimitMap.size > 10000) {
    rateLimitMap.clear();
  }

  return true;
}
