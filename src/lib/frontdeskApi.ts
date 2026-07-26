// Google Apps Script backend for the front-desk check-in feature.
export const CHECKIN_API_URL =
  "https://script.google.com/macros/s/AKfycbwIBgf5LtGLM1QCmpodG4B7jMQD4aFeee_K4z_HQrTDhE8ZvU0CAnOCnweieH9knqex/exec";

const TOKEN_KEY = "skylight_frontdesk_token";
const NAME_KEY = "skylight_frontdesk_name";

export type ApiResult<T = unknown> =
  | ({ result: "success" } & T)
  | { result: "error"; message?: string }
  | { result: "unauthorized" };

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const getName = () => sessionStorage.getItem(NAME_KEY);
export const setSession = (token: string, name?: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  if (name) sessionStorage.setItem(NAME_KEY, name);
};
export const clearSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(NAME_KEY);
};

export async function apiPost<T = Record<string, unknown>>(
  payload: Record<string, unknown>,
): Promise<ApiResult<T>> {
  const res = await fetch(CHECKIN_API_URL, {
    method: "POST",
    // text/plain avoids a CORS preflight; Apps Script still returns JSON.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  try {
    return JSON.parse(text) as ApiResult<T>;
  } catch {
    return { result: "error", message: "Unexpected server response" };
  }
}

export type CheckInRow = {
  loggedAt: string;
  submittedAt: string;
  source: string;
  primaryName: string;
  guestCount: string;
  mobile: string;
  email: string;
  checkin: string;
  checkout: string;
  platform: string;
  from: string;
  to: string;
  consent: string;
  guestNames: string;
  kyc: string;
};

export async function fileToResizedDataUrl(file: File, maxWidth = 1600): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.85);
}
