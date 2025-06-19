import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Router from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/authContext/authContext";

export default function SignUpPage() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setlogin] = useState("");


    useEffect(() => {
        if (isAuthenticated) {
            Router.push("/dashboard");
        }
    }, [isAuthenticated]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Username validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return alert("❌ Username must be 3-20 characters long and can only include letters, numbers, and underscores.");
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert("❌ Please enter a valid email address.");
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return alert("❌ Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        }

        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
                credentials: "include"
            });

            const data = await response.json();
            console.log("Server Response:", data);

            if (!response.ok) {
                return alert(`❌ Registration failed: ${data.message || "Unknown error"}`);
            }
            if (response.ok) {
                setIsAuthenticated(true)
                Router.push("/")
            }





            alert("✅ Registration Successful!");
            setUsername("");
            setEmail("");
            setPassword("");
            setlogin(data.success);
        } catch (error) {
            console.error("Error:", error.message);
            alert("❌ Something went wrong. Please try again.");
        }
    };




    return (
        <div >
            <Header></Header>

            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border border-green-100">
                    <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
                        🌿 Create Account || {login}
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Start shortening your URLs the green way!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="yourusername"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">Email</label>
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
                            <label className="block mb-1 text-gray-600 font-medium">Password</label>
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
                            Sign Up
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
                        Already have an account?{" "}
                        <a href="/login" className="text-green-600 font-semibold hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
