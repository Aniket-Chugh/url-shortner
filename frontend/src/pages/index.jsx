import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import URLShortener from "@/components/URLShortener";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function Home() {
  return (
    <div className="text-white">

      <URLShortener />
    </div>
  );
}
