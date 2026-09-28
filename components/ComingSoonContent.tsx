import Link from "next/link";

export default function ComingSoonContent() {
  return (
    <section className="status-page">
      <p className="kicker">Coming soon</p>
      <h1>This journey is being prepared.</h1>
      <p>
        We&apos;re crafting a new adventure with our guides and village hosts. Want to be the first to know when it
        launches? Get in touch and we&apos;ll keep you posted.
      </p>
      <div className="hero-actions">
        <Link href="/" className="btn primary">Back to home</Link>
        <Link href="/contact" className="btn outline">Contact us</Link>
      </div>
    </section>
  );
}
