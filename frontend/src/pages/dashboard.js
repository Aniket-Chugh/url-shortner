// FRONTEND CODE: Dashboard.js (React + TailwindCSS)

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Dashboard() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/dashboard", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    router.push("/login");
                    throw new Error("Redirecting to login...");
                }
                return res.json();
            })
            .then((json) => {
                if (Array.isArray(json)) {
                    setData(json);
                } else if (Array.isArray(json.data)) {
                    setData(json.data);
                } else {
                    throw new Error("Invalid data format");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch failed:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [router]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this URL?")) return;

        try {
            const res = await fetch(`http://localhost:3001/deletelink`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Delete failed");
            setData(data.filter((item) => item.short_url !== id));
            alert("Deleted successfully");
        } catch (err) {
            alert("Failed to delete");
            console.error(err);
        }
    };

    if (loading) return <div className="text-center p-8 text-gray-600">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

    return (
        <div>
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
                    🌿 Your Shortened Links
                </h1>

                {data.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">No links created yet.</div>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">#</th>
                                    <th className="px-4 py-2 text-left">Short URL</th>
                                    <th className="px-4 py-2 text-left">Original URL</th>
                                    <th className="px-4 py-2 text-left">Expiration</th>
                                    <th className="px-4 py-2 text-left">Created At</th>
                                    <th className="px-4 py-2 text-left">Clicks</th>
                                    <th className="px-4 py-2 text-left">Maximum Clicks</th>
                                    <th className="px-4 py-2 text-left">Destroy Link</th>
                                    <th className="px-4 py-2 text-left">Redirection Link</th>
                                    <th className="px-4 py-2 text-left">QR Code</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id || index} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2 text-blue-600 underline">
                                            <a href={`http://localhost:3001/${item.short_url}`} target="_blank" rel="noopener noreferrer">
                                                {item.short_url}
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 break-all">{item.long_url}</td>
                                        <td className="px-4 py-2">{item.expiration_date ? new Date(item.expiration_date).toLocaleDateString() : "No Expiry"}</td>
                                        <td className="px-4 py-2">{item.created_at}</td>
                                        <td className="px-4 py-2">{item.clicks}</td>
                                        <td className="px-4 py-2">{item.max_clicks}</td>
                                        <td className="px-4 py-2">{item.destroythelink ? "Yes" : "No"}</td>
                                        <td className="px-4 py-2">{item.redirectionLink}</td>
                                        <td className="px-4 py-2">
                                            {item.qrcode ? (
                                                <>
                                                    <img src={item.qrcode} alt="QR Code" className="w-20 h-20 object-contain mx-auto border rounded" />
                                                    <a
                                                        href={item.qrcode}
                                                        download={`qrcode_${item.id || index}.png`}
                                                        className="text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded block mt-1"
                                                    >
                                                        Download
                                                    </a>
                                                </>
                                            ) : (
                                                <span className="text-gray-400">No QR</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => setEditItem(item)}
                                                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.short_url)}
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {editItem && (
                    <Popup open={!!editItem} onClose={() => setEditItem(null)} modal nested>

                        <div className="mt-6 bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Edit Link</h2>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const res = await fetch("http://localhost:3001/editlink", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        credentials: "include",
                                        body: JSON.stringify(editItem),
                                    });

                                    if (res.ok) {
                                        alert("Updated successfully!");
                                        setEditItem(null);
                                        router.reload();
                                    } else {
                                        alert("Failed to update");
                                    }
                                }}
                            >
                                <div className="mb-2">
                                    <label className="block text-sm">Expiration Date</label>
                                    <input
                                        type="date"
                                        value={editItem.expiration_date ? new Date(editItem.expiration_date).toISOString().split("T")[0] : ""}
                                        onChange={(e) => setEditItem({ ...editItem, expiration_date: e.target.value })}
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm">Max Clicks</label>
                                    <input
                                        type="number"
                                        value={editItem.max_clicks || ""}
                                        onChange={(e) => setEditItem({ ...editItem, max_clicks: e.target.value })}
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm">Redirection Link</label>
                                    <input
                                        type="text"
                                        value={editItem.redirectionLink || ""}
                                        onChange={(e) => setEditItem({ ...editItem, redirectionLink: e.target.value })}
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm">Destroy After Max Clicks</label>
                                    <select
                                        value={editItem.destroythelink ? "true" : "false"}
                                        onChange={(e) => setEditItem({ ...editItem, destroythelink: e.target.value === "true" })}
                                        className="border px-2 py-1 rounded w-full"
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                                <button type="submit" className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditItem(null)}
                                    className="ml-2 mt-2 px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </Popup>
                )}
            </div>
            <Footer />
        </div>
    );
}
