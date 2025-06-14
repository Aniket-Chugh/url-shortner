import { useState } from "react";
import {
  Link as LinkIcon,
  Lock,
  Settings,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import Header from "./Header";
import Features from "./Features";
import Footer from "./Footer";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [useCustomId, setUseCustomId] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urlStats, setUrlStats] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [clicks , setclicks] = useState(0);
  const [guestlimit , setguestlimit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      alert("Enter a valid URL");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          isprotected: useCustomId,
          id: customId,
          expirationDate
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to shorten URL");

      setShortenedUrl(`http://localhost:3001/${data.shortUrl}`);
      setUrlStats({
        clicks: data.clicks,
        createdAt: data.created_at,
        isProtected: useCustomId,
      });
      if (clicks == 1) {
        setguestlimit(true);
      }
      setclicks(clicks+1);

      console.log(clicks);


    } catch (err) {
      alert("Something went wrong!");
      console.error("Error:", err.message);
    }
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">
           Smart URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">
              Paste your long URL
            </label>
            <div className="relative">
              <LinkIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 w-full py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                placeholder="https://example.com/your-link"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustomId}
              onChange={() => setUseCustomId(!useCustomId)}
              className="accent-teal-600"
            />
            <label className="font-medium">Use Custom ID</label>
          </div>

          {useCustomId && (
            <input
              type="text"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              placeholder="e.g. mycustom123"
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            />
          )}

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-teal-600 font-medium flex items-center gap-2"
          >
            <Settings size={16} />
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </button>

          {showAdvanced && (
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
              <div className="relative opacity-50 cursor-not-allowed group">
                <label className="flex items-center font-semibold gap-2">
                  Password (Pro)
                  <span className="text-xs bg-gray-300 px-2 py-0.5 rounded-full">
                    PRO
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    disabled
                    placeholder="Available in Pro version"
                    className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden group-hover:block">
                  Upgrade to Pro to enable password protection.
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Expiration Date (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

         <button
  type="submit"
  className="bg-teal-600 text-white w-full py-3 rounded-md font-semibold hover:bg-teal-700 transition"
  disabled={guestlimit ? true : false}
  title={guestlimit ? "Guest limit exceed | Please Sign up  " : "2 chances use this as a guest"}
>
  {isLoading ? "Shortening..." : "Generate Short URL"}
</button>

        </form>

        {shortenedUrl && (
          <div className="mt-6 p-4 border rounded-md bg-green-50 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Short URL:</p>
                <p className="text-teal-600 font-mono">{shortenedUrl}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded ${
                  copied ? "bg-green-400" : "bg-gray-200"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <h1>
              Wants analytics?{" "}
              <Link href="/signup" className="text-black underline">
                Create Account
              </Link>
            </h1>
          </div>
        )}
      </div>

      <Features />
      <Footer />
    </div>
  );
};

export default URLShortener;
