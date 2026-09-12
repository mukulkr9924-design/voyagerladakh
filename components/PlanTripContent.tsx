"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

export default function PlanTripContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    activity: "",
    travelMonth: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "plan_trip", ...formData })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to request your itinerary. Please try again.");
      }

      setFeedback("Thank you. Our team will send you an itinerary shortly.");
      setFormData({ name: "", email: "", activity: "", travelMonth: "" });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to request your itinerary. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="kicker">Plan your trip</span>
        <h2>Tell us about your Ladakh route</h2>
      </motion.div>
      <motion.div
        className="trip-detail-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="trip-detail-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="trip-form" onSubmit={handleSubmit}>
            {[
              { label: "Name", type: "text", placeholder: "Your name", name: "name" },
              { label: "Email", type: "email", placeholder: "you@example.com", name: "email" },
              { label: "Activity", type: "select", name: "activity", options: ["Trekking & Hiking", "Motorbike Touring", "Spiritual Journeys", "Cultural & Village Tours"] },
              { label: "Travel month", type: "text", placeholder: "June 2027", name: "travelMonth" },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                className="form-row"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <label>{field.label}</label>
                {field.type === "select" ? (
                  <select name={field.name} value={formData.activity} onChange={handleChange} required>
                    <option value="">Select activity</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input type={field.type} name={field.name} placeholder={field.placeholder} value={field.name === "name" ? formData.name : field.name === "email" ? formData.email : formData.travelMonth} onChange={handleChange} required={field.name !== "activity"} />
                )}
              </motion.div>
            ))}
            {feedback ? <p className="form-feedback">{feedback}</p> : null}
            <motion.button
              className="btn primary"
              type="submit"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Request itinerary"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
