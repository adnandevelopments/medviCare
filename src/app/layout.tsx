import type { Metadata, Viewport } from "next";
import CartDrawer from "@/components/CartDrawer";
import AgeDisclaimerGate from "@/components/AgeDisclaimerGate";
import ConsentBanner from "@/components/ConsentBanner";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import PressMarquee from "@/components/PressMarquee";
import { DEFAULT_THEME } from "@/lib/themes";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medvicare.care";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "medviCare — Private Care, Practical Plans",
    template: "%s — medviCare",
  },
  description:
    "medviCare connects you with licensed clinicians for personalized treatment plans, discreet delivery, and ongoing support.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "medviCare",
    title: "medviCare — Private Care, Practical Plans",
    description:
      "Clinician-guided online care with discreet delivery for eligible adults in Canada.",
    url: site,
  },
  twitter: {
    card: "summary_large_image",
    title: "medviCare — Private Care, Practical Plans",
    description:
      "Clinician-guided online care with discreet delivery for eligible adults in Canada.",
  },
  alternates: { canonical: site },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3d52a0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className="min-h-full antialiased"
      data-theme={DEFAULT_THEME}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[13000] focus:rounded-full focus:bg-ppc-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content" className="min-w-0 flex-1 overflow-x-clip pt-[72px]">
            {children}
          </main>
          <PressMarquee />
          <FooterCTA />
          <Footer />
          <CartDrawer />
          <ConsentBanner />
          <AgeDisclaimerGate />
        </CartProvider>
      </body>
    </html>
  );
}
