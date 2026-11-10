import { getSiteContent } from "@/lib/content";
import SectionEditor from "../content/SectionEditor";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function IntroPage({ searchParams }) {
  const sp = await searchParams;
  const site = await getSiteContent();
  return <SectionEditor section="intro" values={site.intro} saved={sp?.saved === "1"} error={sp?.error === "1"} />;
}
