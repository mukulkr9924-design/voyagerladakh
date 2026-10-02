"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function EnquiryForm({ variant, journeyTypes = [] }: { variant: "contact" | "plan_trip"; journeyTypes?: string[] }) {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const isPlan = variant === "plan_trip";
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: variant,
          language: locale,
          ...Object.fromEntries(new FormData(form)),
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await response.json();
      // The server's messages are in English; show the visitor's language instead.
      if (response.status === 429) throw new Error(t.form.tooMany);
      if (!response.ok || !data.success) throw new Error(t.form.error);
      form.reset();
      setStatus({ kind: "ok", message: isPlan ? t.form.thanksPlan : t.form.thanksContact });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error && error.message === t.form.tooMany ? error.message : t.form.error });
    }
  };

  const id = (name: string) => `${variant}-${name}`;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Honeypot: hidden from people and screen readers, but bots fill it in. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={id("name")}>{t.form.name}</label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required placeholder={t.form.namePlaceholder} />
        </div>
        <div className="field">
          <label htmlFor={id("email")}>{t.form.email}</label>
          <input id={id("email")} name="email" type="email" autoComplete="email" required placeholder="you@example.com" dir="ltr" />
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>{t.form.phone} <span className="optional">{t.form.optional}</span></label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+91 …" dir="ltr" />
        </div>
        {isPlan ? (
          <>
            <div className="field">
              <label htmlFor={id("activity")}>{t.form.journeyType}</label>
              <select id={id("activity")} name="activity" required defaultValue="">
                <option value="" disabled>{t.form.selectJourney}</option>
                {journeyTypes.map((name) => <option key={name} value={name}>{name}</option>)}
                <option value={t.form.notSure}>{t.form.notSure}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={id("travelMonth")}>{t.form.when}</label>
              <input id={id("travelMonth")} name="travelMonth" type="text" required placeholder={t.form.whenPlaceholder} />
            </div>
          </>
        ) : null}
        <div className="field full">
          <label htmlFor={id("message")}>
            {isPlan ? <>{t.form.anythingElse} <span className="optional">{t.form.optional}</span></> : t.form.message}
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={isPlan ? 4 : 6}
            required={!isPlan}
            placeholder={isPlan ? t.form.planPlaceholder : t.form.contactPlaceholder}
          />
        </div>
      </div>

      <div className="form-foot">
        <button className="btn primary" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? t.form.sending : isPlan ? t.form.request : t.form.send}
        </button>
        <p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p>
      </div>
    </form>
  );
}
