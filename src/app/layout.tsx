import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { NavBar } from "@/components/chrome/NavBar";
import { Footer } from "@/components/chrome/Footer";
import { AuthSessionProvider } from "@/components/auth/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "gym Lawley",
    "fitness studio",
    "personal training",
    "group classes",
    "bootcamp",
    "Absolute Fitness Studio",
    "South Africa fitness",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={inter.variable}>
      <body className="min-h-dvh bg-bg font-sans text-text">
        <AuthSessionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent focus:label-voice"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="main">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
