import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { VideoGrid } from "@/components/marketing/VideoGrid";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch sessions, walkthroughs and member stories from Absolute Fitness Studio in Lawley.",
};

const VIDEOS = [
  {
    id: "intro",
    title: "Studio walkthrough",
    thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "bootcamp",
    title: "Inside a bootcamp session",
    thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "group",
    title: "Group class energy",
    thumb: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "private",
    title: "One-on-one coaching",
    thumb: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "form",
    title: "Perfect your squat form",
    thumb: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "story",
    title: "Member story: starting over",
    thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Watch now"
        title="Videos"
        description="Press play on a walkthrough, a session, or a member story. The image carries the colour — the play control carries the brand."
      />
      <section className="py-16">
        <Container>
          <VideoGrid videos={VIDEOS} />
        </Container>
      </section>
      <CTABand />
    </>
  );
}
