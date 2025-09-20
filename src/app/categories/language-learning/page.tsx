import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { LanguageLearningSection } from "@/components/sections/language-learning";

export default function LanguageLearningPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <LanguageLearningSection />
      <Footer />
    </main>
  );
}