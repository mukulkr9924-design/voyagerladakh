import { notFound } from "next/navigation";

// Any address that isn't a page shows app/[lang]/not-found.tsx, with the header and footer in the
// visitor's language.
export default function CatchAll() {
  notFound();
}
