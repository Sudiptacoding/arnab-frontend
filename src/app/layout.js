import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://arnab.vercel.app"),

  title: {
    default: "Arnab Sarkar | Professional Photo Retoucher",
    template: "%s | Arnab Sarkar",
  },

  description:
    "Arnab Sarkar is a professional photo retoucher specializing in skin retouching, fashion retouching, jewelry retouching, newborn photo retouching, body shaping, product photo retouching, and wedding photo retouching.",

  keywords: [
    "Arnab Sarkar",
    "Arnab Sarkar photo retoucher",
    "professional photo retoucher",
    "photo retouching",
    "photo editing",
    "skin photo retouch",
    "fashion cloth retouch",
    "fashion jewelry retouch",
    "newborn photo retouch",
    "body shaping retouch",
    "product photo retouch",
    "wedding photo retouch",
    "Photoshop retouching",
    "professional photo editing",
    "Bangladesh photo retoucher",
  ],

  authors: [
    {
      name: "Arnab Sarkar",
      url: "https://arnab.vercel.app",
    },
  ],

  creator: "Arnab Sarkar",
  publisher: "Arnab Sarkar",

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
    canonical: "https://arnab.vercel.app",
  },

  openGraph: {
    title: "Arnab Sarkar | Professional Photo Retoucher",

    description:
      "Professional photo retouching services including skin, fashion, jewelry, newborn, body shaping, product, and wedding photo retouching.",

    url: "https://arnab.vercel.app",

    siteName: "Arnab Sarkar",

    images: [
      {
        url: "/images/logos/arnab.jpg",
        width: 1200,
        height: 630,
        alt: "Arnab Sarkar - Professional Photo Retoucher",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Arnab Sarkar | Professional Photo Retoucher",

    description:
      "Professional photo retouching services for photographers, fashion brands, e-commerce businesses, and creative professionals.",

    images: ["/images/logos/arnab.jpg"],
  },

  icons: {
    icon: "/images/logos/arnab.jpg",
    shortcut: "/images/logos/arnab.jpg",
    apple: "/images/logos/arnab.jpg",
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