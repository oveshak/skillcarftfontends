import Navigation from '@/components/sections/navigation';
import HeroSection from '@/components/sections/hero';
import OfflineCenters from '@/components/sections/offline-centers';
import VideoSection from '@/components/sections/video-section';
import SscHscCourses from '@/components/sections/ssc-hsc-courses';
import SkillsCourses from '@/components/sections/skills-courses';
import AdmissionCourses from '@/components/sections/admission-courses';
import JobPreparationSection from '@/components/sections/job-preparation';
import Testimonials from '@/components/sections/testimonials';
import FreeResources from '@/components/sections/free-resources';
import SuccessStats from '@/components/sections/success-stats';
import MobileAppSection from '@/components/sections/mobile-app';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <OfflineCenters />
      <VideoSection />
      <SscHscCourses />
      <SkillsCourses />
      <AdmissionCourses />
      <JobPreparationSection />
      <Testimonials />
      <FreeResources />
      <SuccessStats />
      <MobileAppSection />
      <Footer />
    </main>
  );
}