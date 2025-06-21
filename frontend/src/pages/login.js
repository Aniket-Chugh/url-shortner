import React, { useState, useEffect } from "react";
import Router from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/authContext/authContext";

export default function LoginPage() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            Router.push("/dashboard");
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Login failed. Please check your credentials.");
                return;
            }

            setIsAuthenticated(true);
            alert("Login Successful ✨");
            Router.push("/dashboard");
        } catch (error) {
            console.error("Login Error:", error.message);
            alert("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Header />

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border border-green-100">
                    <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
                        🌿 Welcome Back!
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Login to continue your green journey 🌱
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600 transition duration-300"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-400">or</div>

                    <div className="flex gap-3">
                        <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200 transition">
                            Google
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-300 transition">
                            GitHub
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
