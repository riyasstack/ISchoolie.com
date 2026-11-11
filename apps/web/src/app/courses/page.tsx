import { CourseCatalog } from "@/components/learning";
import { PublicNav, PublicFooter } from "@/components/public-home";
export const metadata = { title: "Explore learning" };
export default function CatalogPage() {
  return (
    <>
      <PublicNav />
      <main id="main-content" className="content-page">
        <CourseCatalog />
      </main>
      <PublicFooter />
    </>
  );
}
