import { getSiteContent } from "@/lib/content";
import SectionEditor from "../content/SectionEditor";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function SettingsPage({ searchParams }) {
  const sp = await searchParams;
  const site = await getSiteContent();
  return <SectionEditor section="settings" values={site.settings} saved={sp?.saved === "1"} error={sp?.error === "1"} />;
}
