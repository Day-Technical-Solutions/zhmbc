/** @format */

import { useCallback, useMemo, useRef, useState } from "react";

export type SendEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type UseSendEmailResult = {
  sendEmail: (payload: SendEmailPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
  abort: () => void;
};

export function useSendEmail(endpoint: string): UseSendEmailResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const sendEmail = useCallback(
    async (payload: SendEmailPayload) => {
      // basic guardrails
      if (
        !payload?.name ||
        !payload.email ||
        !payload.subject ||
        !payload.message
      ) {
        setError("Missing subject/name/email/message");
        setSuccess(false);
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data?.error || "Failed to send email");
        }

        setSuccess(true);
      } catch (e: any) {
        if (e?.name === "AbortError") return; // aborted by user
        setError(e?.message || "Unexpected error");
        setSuccess(false);
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [endpoint]
  );

  return useMemo(
    () => ({ sendEmail, loading, error, success, reset, abort }),
    [sendEmail, loading, error, success, reset, abort]
  );
}
