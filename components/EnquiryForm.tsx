"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function EnquiryForm({ variant, journeyTypes = [] }: { variant: "contact" | "plan_trip"; journeyTypes?: string[] }) {
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
          ...Object.fromEntries(new FormData(form)),
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus({
        kind: "ok",
        message: isPlan
          ? "Thank you! Our team will send you an itinerary shortly."
          : "Thank you for your message! We'll get back to you soon.",
      });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
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
          <label htmlFor={id("name")}>Name</label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required placeholder="Your full name" />
        </div>
        <div className="field">
          <label htmlFor={id("email")}>Email</label>
          <input id={id("email")} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>Phone / WhatsApp <span className="optional">optional</span></label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+91 …" />
        </div>
        {isPlan ? (
          <>
            <div className="field">
              <label htmlFor={id("activity")}>Journey type</label>
              <select id={id("activity")} name="activity" required defaultValue="">
                <option value="" disabled>Select a journey</option>
                {journeyTypes.map((name) => <option key={name} value={name}>{name}</option>)}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={id("travelMonth")}>When are you travelling?</label>
              <input id={id("travelMonth")} name="travelMonth" type="text" required placeholder="e.g. June 2027" />
            </div>
          </>
        ) : null}
        <div className="field full">
          <label htmlFor={id("message")}>
            {isPlan ? <>Anything else? <span className="optional">optional</span></> : "Message"}
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={isPlan ? 4 : 6}
            required={!isPlan}
            placeholder={isPlan ? "Group size, fitness level, must-see places…" : "Tell us about your travel plans…"}
          />
        </div>
      </div>

      <div className="form-foot">
        <button className="btn primary" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : isPlan ? "Request my itinerary" : "Send message"}
        </button>
        <p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p>
      </div>
    </form>
  );
}
