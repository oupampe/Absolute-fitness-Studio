// Placeholder imagery (Unsplash) for class covers and the gallery.
// Swap these for real studio photography before launch.

import { Plan } from "@prisma/client";

export const CLASS_COVERS: Record<Exclude<Plan, "NONE">, string> = {
  BOOTCAMP: "/classes/fitness-bootcamp.jpg",
  GROUP: "/classes/group-class.jpg",
  PRIVATE:
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80",
};

// Self-hosted preview clips played from a class card's play control. Portrait
// phone footage, so the lightbox is kept narrow (see ClassCard).
export const CLASS_VIDEOS: Partial<Record<Exclude<Plan, "NONE">, string>> = {
  BOOTCAMP: "/videos/fitness-bootcamp.mp4",
  GROUP: "/videos/group-class.mp4",
};

export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", alt: "Free weights rack", span: "tall" },
  { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80", alt: "Member mid-workout", span: "wide" },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80", alt: "Kettlebell training", span: "normal" },
  { src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80", alt: "Battle ropes session", span: "normal" },
  { src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80", alt: "Group class energy", span: "tall" },
  { src: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80", alt: "Strength coaching", span: "normal" },
  { src: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80", alt: "Studio floor", span: "wide" },
  { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80", alt: "Treadmill cardio", span: "normal" },
] as const;
