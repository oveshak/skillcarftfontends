import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { IELTSProduct } from "@/components/sections/ielts-product";

export default function IELTSCoursePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <IELTSProduct />
      <Footer />
    </main>
  );
}