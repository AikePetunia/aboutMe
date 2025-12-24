import fetch from "node-fetch";
import crypto from "crypto";
import { Provider } from "./types";

export function makeRequestId() {
  return crypto.randomBytes(8).toString("hex");
}

/**
 * receives the provider for fetching purposes
 * @param provider - provider name
 * @param url - fetch url
 * @param init - fetch init options
 * @returns {Object} json response
 */
export async function fetchJson(
  provider: Provider,
  url: string,
  init?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
    headers?: Record<string, string>;
    body?: any;
    timeoutMs?: number;
  }
) {
  const requestId = makeRequestId();
  const timeoutMs = init?.timeoutMs ?? 10000;

  const controller = new AbortController();
  const t = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const res = await fetch(url, {
      method: init?.method ?? "GET",
      headers: init?.headers,
      body: init?.body,
      signal: controller.signal,
    });

    const text = await res.text().catch(() => "");
    const retryAfter = res.headers.get("retry-after");
    const retryAfterSec = retryAfter ? Number(retryAfter) : undefined;

    // try parsing json
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      // ignore json parse error
    }
    return {
      ok: res.ok,
      status: res.status,
      retryAfterSec,
      text,
      json,
      requestId,
      provider,
    };
  } catch (e: any) {
    return {
      ok: false,
      status: 0,
      retryAfterSec: undefined,
      text: "",
      json: null,
      requestId,
      provider,
      networkError: String(e.message ?? e),
    };
  } finally {
    clearTimeout(t);
  }
}
