"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const PLATFORMS = [
  { id: "facebook", name: "Facebook", bg: "#1877f2" },
  { id: "github", name: "GitHub", bg: "#3e4856" },
  { id: "discord", name: "Discord", bg: "#00b0f4" },
  { id: "twitter", name: "Twitter", bg: "#1da1f2" },
  { id: "youtube", name: "YouTube", bg: "#ff0000" },
  { id: "linkedin", name: "LinkedIn", bg: "#0a66c2" },
  { id: "email", name: "Email", bg: "#ea4335" },
  { id: "whatsapp", name: "WhatsApp", bg: "#25d366" },
];

export default function SocialAdminManager() {
  const [socials, setSocials] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Read
  const fetchSocials = async () => {
    const res = await axios.get("https://arnab-backend.vercel.app/api/socials");
    setSocials(res.data);
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  // Create & Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const platformData = PLATFORMS.find((p) => p.id === selectedPlatform);

    const payload = {
      platform: selectedPlatform,
      url: url,
      bgColor: platformData?.bg || "#333",
    };

    if (editingId) {
      await axios.put(`https://arnab-backend.vercel.app/api/socials/${editingId}`, payload);
      setEditingId(null);
    } else {
      await axios.post("https://arnab-backend.vercel.app/api/socials", payload);
    }

    setSelectedPlatform("");
    setUrl("");
    fetchSocials();
  };

  // Edit Trigger
  const handleEdit = (item) => {
    setEditingId(item._id);
    setSelectedPlatform(item.platform);
    setUrl(item.url);
  };

  // Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await axios.delete(`https://arnab-backend.vercel.app/api/socials/${id}`);
      fetchSocials();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 my-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editingId ? "Edit Social Link" : "Add Social Link"}
      </h2>
    <div className="flex items-center gap-3">

   
      {/* Header Video Manage */}
      <button
        onClick={() => {
          window.location.href = "/admin";
        }}
        className="px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
          Go to Admin Dashboard
      </button>



      <button
  onClick={() => {
    window.location.href = "/";
  }}
  className="flex items-center gap-2 px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>

  Go to Home
</button>

    </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Select Platform</label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            required
            className="w-full p-3 border rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-[#6345ED]"
          >
            <option value="">-- Choose Platform --</option>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">URL / Link</label>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-3 border rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-[#6345ED]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6345ED] text-white font-bold p-3 rounded-xl hover:bg-[#5235db] transition flex items-center justify-center gap-2"
        >
          <FaPlus /> {editingId ? "Update Link" : "Save Link"}
        </button>
      </form>

      {/* List */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-bold text-gray-700">Existing Links:</h3>
        {socials.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50">
            <div>
              <p className="font-bold text-sm uppercase text-gray-800">{item.platform}</p>
              <p className="text-xs text-gray-500">{item.url}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}