import { notFound } from "next/navigation";
import { courses } from "@/lib/preview";
import { CourseDetail } from "@/components/learning";
export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: courses.find((c) => c.id === id)?.title ?? "Course not found",
  };
}
export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
