import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://retouchlab360.vercel.app"),

  title: {
    default: "RetouchLab360 | Professional Photo Retouching",
    template: "%s | RetouchLab360",
  },

  description:
    "RetouchLab360 provides professional photo retouching services including skin retouching, fashion retouching, jewelry retouching, newborn photo retouching, body shaping, product photo retouching, and wedding photo retouching.",

  keywords: [
    "RetouchLab360",
    "Retouch Lab 360",
    "photo retouching",
    "professional photo retouching",
    "photo editing service",
    "skin photo retouch",
    "fashion cloth retouch",
    "fashion jewelry retouch",
    "newborn photo retouch",
    "body shaping retouch",
    "product photo retouch",
    "wedding photo retouch",
    "Photoshop retouching",
    "professional photo editor",
    "photo retoucher",
    "Bangladesh photo retoucher",
  ],

  authors: [
    {
      name: "RetouchLab360",
      url: "https://retouchlab360.vercel.app",
    },
  ],

  creator: "RetouchLab360",
  publisher: "RetouchLab360",

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
    canonical: "https://retouchlab360.vercel.app",
  },

  openGraph: {
    title: "RetouchLab360 | Professional Photo Retouching",

    description:
      "Professional photo retouching services for photographers, fashion brands, e-commerce businesses, and creative professionals.",

    url: "https://retouchlab360.vercel.app",

    siteName: "RetouchLab360",

    images: [
      {
        url: "/images/logos/newlogo (2).jpg",
        width: 1200,
        height: 630,
        alt: "RetouchLab360 - Professional Photo Retouching",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "RetouchLab360 | Professional Photo Retouching",

    description:
      "Professional photo retouching services for photographers, fashion brands, e-commerce businesses, and creative professionals.",

    images: ["/images/logos/newlogo (2).jpg"],
  },

  icons: {
    icon: "/images/logos/newlogo (2).jpg",
    shortcut: "/images/logos/newlogo (2).jpg",
    apple: "/images/logos/newlogo (2).jpg",
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}