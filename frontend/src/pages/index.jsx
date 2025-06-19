import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import URLShortener from "@/components/URLShortener";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function Home() {
  return (
    <>
      <Head>
        <title>URL Shortener - Create Short URLs Easily</title>
        <meta name="description" content="Free and fast URL shortener tool built with Next.js. Create short links in seconds." />
        <meta name="keywords" content="URL shortener, short URL, link shortener, Next.js, QR code generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="URL Shortener" />
        <meta property="og:description" content="Create short URLs easily and generate QR codes." />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="text-white">
        <URLShortener />
      </div>
    </>
  );
}
