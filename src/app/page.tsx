import { Hero } from "@/components/marketing/Hero";
import { MissionBand } from "@/components/marketing/MissionBand";
import { BlogTeaser } from "@/components/marketing/BlogTeaser";
import { ClassesSection } from "@/components/marketing/ClassesSection";
import { VideoFeature } from "@/components/marketing/VideoFeature";
import { GallerySection } from "@/components/marketing/GallerySection";
import { CTABand } from "@/components/marketing/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionBand />
      <BlogTeaser />
      <ClassesSection />
      <VideoFeature />
      <GallerySection />
      <CTABand />
    </>
  );
}
