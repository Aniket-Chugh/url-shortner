import React, { useState } from "react";
import { Menu, X, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/authContext/authContext";

const Header = () => {
      const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const logout = async()=>{
const res = await fetch("http://localhost:3001/logout" , {
    method:"POST",
    credentials: "include",
})


if (res) {
    setIsAuthenticated(false);
    console.log(res.message);
}
  }


  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl font-bold text-white">ShortlyPro</h1>
              <p className="text-sm text-gray-400">Advanced URL Shortener</p>
            </div>
          </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="http://localhost:3000/#features"
              className="text-sm font-bold  text-gray-300 hover:text-white  transition-colors animate-pulse"
            >
              Features
            </a>

            <Link
              href="PricingPage"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>


            {
                isAuthenticated ?


            <button onClick={logout} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Logout
            </button>
: <Link href={"/login"}>


            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Login
            </button>
</Link>
            }




            {
                isAuthenticated ? <Link href={"/dashboard"}>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform">
              Dashboard
            </button>
</Link>: <Link href={"/signup"}>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform">
              Signup
            </button>
</Link>
            }


          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-700 pt-4">
            <nav className="flex flex-col gap-4 text-sm">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#analytics"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Analytics
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button className="text-gray-300 hover:text-white transition-colors animate-pulse">
                Services
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Login
              </button>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow-md">
                Signup
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
