import { redirect } from "next/navigation";

// Case studies moved to the site level — they cover the whole agency,
// not just the martech practice.
export default function MartechCaseStudiesRedirect() {
  redirect("/case-studies");
}
