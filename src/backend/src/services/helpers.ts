import { Provider } from "./types";
import { ApiErr } from "./types";

export function ok<T>(provider: Provider, data: T, cached = false) {
  return {
    ok: true as const,
    provider,
    fetchedAt: Date.now(),
    cached,
    data,
  };
}

export function err(
  provider: Provider,
  requestId: string,
  opts: {
    code: ApiErr["error"]["code"];
    status: number;
    message: string;
    retryAfterSec?: number;
    details?: string;
  }
) {
  return {
    ok: false as const,
    provider,
    fetchedAt: Date.now(),
    error: {
      requestId,
      ...opts,
    },
  };
}
