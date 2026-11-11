import { notFound } from "next/navigation";
import { PublicNav, PublicFooter } from "@/components/public-home";
import { ActionLink, Badge } from "@/components/ui";
export function generateStaticParams() {
  return ["about", "trust", "institutions"].map((page) => ({ page }));
}
const pages = {
  about: {
    eyebrow: "THE IDEA BEHIND ISCHOOLIE",
    title: "Education is a shared possibility.",
    lead: "We’re designing a world where the people, knowledge, and places that help us grow are connected.",
    blocks: [
      {
        title: "People before platforms.",
        body: "A useful education network begins with the people in it: curious learners, thoughtful teachers, engaged families, and institutions with a shared purpose.",
      },
      {
        title: "Learning beyond a lesson.",
        body: "A question leads to a conversation. A conversation leads to a course. A course opens a new opportunity. iSchoolie is designed to make those connections feel natural.",
      },
      {
        title: "One identity. Clear boundaries.",
        body: "Public education communities and private academic operations serve different purposes. Connecting them must never erase the boundaries that protect learners.",
      },
      {
        title: "Built with intention.",
        body: "This frontend preview explores a proposed product identity. Product claims, pricing, policies, and launch readiness remain subject to review.",
      },
    ],
  },
  trust: {
    eyebrow: "CONNECTION BEGINS WITH TRUST",
    title: "A little more care. At every connection.",
    lead: "Privacy, appropriate relationships, and clear permissions shape how iSchoolie is being designed.",
    blocks: [
      {
        title: "Public and private stay distinct.",
        body: "A network connection never gives access to institution records. Official attendance, grades, and fees belong to an authorized academic context.",
      },
      {
        title: "Young learners deserve thoughtful boundaries.",
        body: "Age assurance, guardian evidence, and adult–minor contact rules require policy approval. This preview does not enable unrestricted messaging or student discovery.",
      },
      {
        title: "Family access is specific.",
        body: "A guardian relationship is verified separately for each child and data category. It does not automatically include private messages or unpublished grades.",
      },
      {
        title: "The preview is transparent.",
        body: "Example names, activities, and academic records are fictional. Local interactions do not publish content, authorize access, move money, or alter official records.",
      },
    ],
  },
  institutions: {
    eyebrow: "A CONNECTED INSTITUTION",
    title: "Bring your learning world together.",
    lead: "A proposed workspace for the people, processes, and learning experiences that make an institution work.",
    blocks: [
      {
        title: "A clear academic picture.",
        body: "Purpose-built directories, classroom registers, schedules, and reporting keep academic work focused. Complex workflows are designed for desktop, with deliberate mobile summaries.",
      },
      {
        title: "Families in the loop.",
        body: "Authorized family views connect announcements and learning summaries without exposing staff-only information or unrelated child records.",
      },
      {
        title: "Operations with a clear trail.",
        body: "Review states, deliberate confirmations, role-scoped actions, and audit history are core design requirements for admissions, results, and finance.",
      },
      {
        title: "Thoughtful adoption.",
        body: "Registration, evidence review, tenant ownership, and delegated staff access must be completed before an institution is active. No organization is verified by this preview.",
      },
    ],
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: pages[page as keyof typeof pages]?.title ?? "Not found" };
}
export default async function PublicPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const content = pages[page as keyof typeof pages];
  if (!content) notFound();
  return (
    <>
      <PublicNav />
      <main id="main-content" className="content-page">
        <Badge>Proposed product direction</Badge>
        <div className="section-kicker space-top">{content.eyebrow}</div>
        <h1>{content.title}</h1>
        <p className="lead">{content.lead}</p>
        <div className="content-columns">
          {content.blocks.map((b) => (
            <section className="content-panel" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </section>
          ))}
        </div>
        <div className="space-top">
          <ActionLink
            href={page === "institutions" ? "/org/example/students" : "/app"}
          >
            Explore the frontend preview
          </ActionLink>
        </div>
        {page === "trust" && (
          <p className="space-top metadata">
            This is a design approach, not a final legal policy or compliance
            certification.
          </p>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
