import { notFound } from "next/navigation";
import { ScreenPreview } from "@/components/enterprise/screen-preview";
import { getScreen } from "../../../../../../packages/contracts/frontend";
const routes: Record<string, string> = {
  network: "PUB-05",
  people: "PUB-06",
  educators: "PUB-07",
  "educator-profile": "PUB-08",
  institutions: "PUB-11",
  "institution-profile": "PUB-12",
  communities: "PUB-13",
  "community-preview": "PUB-14",
  events: "PUB-15",
  opportunities: "PUB-16",
  pricing: "PUB-17",
  "become-educator": "PUB-18",
  "register-institution": "PUB-19",
  help: "PUB-20",
  contact: "PUB-21",
  legal: "PUB-22",
};
export function generateStaticParams() {
  return Object.keys(routes).map((slug) => ({ slug }));
}
export default async function DiscoverPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = getScreen(routes[slug]);
  if (!spec) notFound();
  return <ScreenPreview key={slug} spec={spec} />;
}
