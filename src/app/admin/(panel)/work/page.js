import { getSiteContent } from "@/lib/content";
import SectionEditor from "../content/SectionEditor";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function WorkHeaderPage({ searchParams }) {
  const sp = await searchParams;
  const site = await getSiteContent();
  const note = (
    <>
      Individual projects are managed in the <a href="/admin/projects">Projects list</a>.
    </>
  );
  return (
    <SectionEditor
      section="work"
      values={site.work}
      saved={sp?.saved === "1"}
      error={sp?.error === "1"}
      note={note}
    />
  );
}
