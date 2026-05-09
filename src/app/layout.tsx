import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import LoadingScreen from "@/components/ui/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_URL = "https://ecovistalife.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EcoVistaLife | Premium Property Developers in Coimbatore",
    template: "%s | EcoVistaLife",
  },
  description:
    "Leading property developers in Coimbatore & Karamadai. Premium DTCP/RERA approved eco-friendly villa plots, gated communities, and sustainable luxury living. Book a site visit today.",
  keywords: [
    "property developers Coimbatore",
    "villa plots Karamadai",
    "DTCP approved plots",
    "RERA approved plots Coimbatore",
    "gated community Coimbatore",
    "eco-friendly plots",
    "premium villa plots",
    "sustainable living Coimbatore",
    "EcoVistaLife",
    "real estate Coimbatore",
    "plots for sale Karamadai",
    "luxury villas Coimbatore",
    "NRI property investment India",
  ],
  authors: [{ name: "EcoVistaLife", url: SITE_URL }],
  creator: "EcoVistaLife",
  publisher: "EcoVistaLife",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "EcoVistaLife",
    title: "EcoVistaLife | Premium Property Developers in Coimbatore",
    description:
      "Leading property developers in Coimbatore & Karamadai. Premium DTCP/RERA approved eco-friendly villa plots, gated communities, and sustainable luxury living.",
    images: [
      {
        url: "/Images/Gardenia/IMG_4923.JPG",
        width: 1200,
        height: 630,
        alt: "EcoVistaLife — Premium Gated Communities in Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoVistaLife | Premium Property Developers in Coimbatore",
    description:
      "Leading property developers in Coimbatore & Karamadai. Premium DTCP/RERA approved eco-friendly villa plots & gated communities.",
    images: ["/Images/Gardenia/IMG_4923.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
