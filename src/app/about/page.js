"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, Trash2, Save, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { message as antMessage } from "antd";
import imageCompression from "browser-image-compression"; // কম্প্রেস লাইব্রেরি

// ImgBB API Key
const IMGBB_API_KEY = "9d5e814c7c5f4867978ca6169e144b8b";

// ImgBB Upload Function (Auto Compress সহ)
export const uploadToImgBB = async (file) => {
  if (!file) return null;

  // ১. ইমেজ ফাইল টাইপ ভ্যালিডেশন
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    antMessage.error("You can only upload JPG/PNG/WEBP files!");
    return null;
  }

  let fileToUpload = file;
  const fileSizeInMB = file.size / 1024 / 1024;

  // ২. ইমেজ ২ MB বা তার বেশি (যেমন ৫.৮৫ MB) হলে তা স্বয়ংক্রিয়ভাবে কম্প্রেস হবে
  if (fileSizeInMB > 2) {
    antMessage.loading({
      content: `Compressing image (${fileSizeInMB.toFixed(1)}MB)...`,
      key: "compressMsg",
      duration: 2,
    });

    const options = {
      maxSizeMB: 2,           // যত বড় ফাইলই হোক, কম্প্রেস হয়ে ২ MB-এর নিচে নামিয়ে আনবে
      maxWidthOrHeight: 1920, // Full HD রেজোলিউশনে রাখবে যাতে কোয়ালিটি দারুণ থাকে
      useWebWorker: true,
      maxIteration: 10,
      initialQuality: 0.8,
    };

    try {
      fileToUpload = await imageCompression(file, options);
    } catch (compressionError) {
      console.error("Compression error:", compressionError);
      antMessage.error("Failed to compress image!");
      return null;
    }
  }

  // ৩. FormData তৈরি করে আপলোড
  const formData = new FormData();
  formData.append("image", fileToUpload, file.name);

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: IMGBB_API_KEY,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data?.data?.display_url;
  } catch (error) {
    console.error("ImgBB upload error:", error);
    antMessage.error("Image upload failed! Please try again.");
    return null;
  }
};

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFounder, setUploadingFounder] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    badgeText: "Master Retoucher",
    founderName: "ARNAB",
    founderRole: "MEET THE FOUNDER",
    founderBio:
      "Master retoucher with 15+ years of experience, dedicated to crafting high-end visual solutions and perfection.",
    founderImage: "/images/logos/Arnab.jpg",
    logoImage: "/images/logos/newlogo (2).jpg",
    companyTitle: "RETOUCH LAB 360",
    tagline: "Professional Photo Retouching & Manipulation",
    servicesTitle: "OUR SERVICES:",
    services: [
      "Pro High-End Skin Retouching",
      "Creative Photo Manipulation",
      "Precise E-commerce Product Editing",
    ],
  });

  // ডাটা লোড করা
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://arnab-backend.vercel.app/api/about");
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to load about data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ImgBB তে ইমেজ হ্যান্ডলার
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === "founderImage") setUploadingFounder(true);
    if (fieldName === "logoImage") setUploadingLogo(true);

    const uploadedUrl = await uploadToImgBB(file);

    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, [fieldName]: uploadedUrl }));
      antMessage.success("Image uploaded successfully!");
    }

    if (fieldName === "founderImage") setUploadingFounder(false);
    if (fieldName === "logoImage") setUploadingLogo(false);

    // ইনপুট রিসেট করা যাতে একই ফাইল বারবার সিলেক্ট করা যায়
    e.target.value = "";
  };

  // সার্ভিস যুক্ত করা
  const handleServiceChange = (index, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = value;
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, ""],
    }));
  };

  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  // ডাটা সেভ করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage("");

    try {
      const res = await fetch("https://arnab-backend.vercel.app/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("About section updated successfully!");
      } else {
        setStatusMessage("Failed to update.");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-amber-400 flex items-center justify-center">
        <RefreshCw className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-amber-400 tracking-wider">
              EDIT ABOUT SECTION
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Update text, images, and services for your main page.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <RefreshCw className="animate-spin w-5 h-5" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= EDIT FORM (LEFT) ================= */}
          <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-6 bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800">
            
            {/* Founder Details */}
            <div className="space-y-4">
              <h2 className="text-amber-400 font-bold text-sm tracking-widest uppercase border-b border-zinc-800 pb-2">
                Founder Settings
              </h2>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Badge Text</label>
                <input
                  type="text"
                  name="badgeText"
                  value={formData.badgeText}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Role Subtitle</label>
                  <input
                    type="text"
                    name="founderRole"
                    value={formData.founderRole}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Founder Name</label>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Founder Image Upload Field */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Founder Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="founderImage"
                    value={formData.founderImage}
                    onChange={handleChange}
                    placeholder="URL or upload image"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                  />
                  <label className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-3 rounded-lg hover:bg-amber-500 hover:text-black transition cursor-pointer shrink-0 text-xs font-semibold">
                    {uploadingFounder ? <RefreshCw className="animate-spin w-4 h-4" /> : <Upload size={16} />}
                    {uploadingFounder ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "founderImage")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Founder Bio</label>
                <textarea
                  name="founderBio"
                  rows={3}
                  value={formData.founderBio}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Brand Details */}
            <div className="space-y-4">
              <h2 className="text-amber-400 font-bold text-sm tracking-widest uppercase border-b border-zinc-800 pb-2">
                Brand Settings
              </h2>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Company Title</label>
                <input
                  type="text"
                  name="companyTitle"
                  value={formData.companyTitle}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                />
              </div>

              {/* Logo Image Upload Field */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Logo Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="logoImage"
                    value={formData.logoImage}
                    onChange={handleChange}
                    placeholder="URL or upload image"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                  />
                  <label className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-3 rounded-lg hover:bg-amber-500 hover:text-black transition cursor-pointer shrink-0 text-xs font-semibold">
                    {uploadingLogo ? <RefreshCw className="animate-spin w-4 h-4" /> : <Upload size={16} />}
                    {uploadingLogo ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "logoImage")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <h2 className="text-amber-400 font-bold text-sm tracking-widest uppercase">
                  Services List
                </h2>
                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                >
                  <Plus size={14} /> Add Service
                </button>
              </div>

              {formData.services.map((service, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-amber-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </form>

          {/* ================= LIVE PREVIEW (RIGHT) ================= */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
              Live Component Preview
            </h2>
            
            <div className="relative w-full bg-black text-white p-6 rounded-3xl border border-zinc-800 overflow-hidden min-h-[500px] flex items-center justify-center">
              <div className="relative z-10 max-w-full w-full grid grid-cols-1 gap-6 items-center">
                
                {/* Founder Box */}
                <div className="bg-zinc-950/80 border border-amber-500/20 rounded-3xl p-5 flex flex-col items-center text-center group relative">
                  <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles size={12} /> {formData.badgeText}
                  </div>
                  <div className="relative w-28 h-28 rounded-2xl border-2 border-amber-400/50 bg-zinc-900 overflow-hidden my-3">
                    <Image
                      src={formData.founderImage || "/images/logos/Arnab.jpg"}
                      alt={formData.founderName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-amber-400 text-xs font-bold tracking-widest uppercase">
                    {formData.founderRole}
                  </h3>
                  <h4 className="text-lg font-black text-white">{formData.founderName}</h4>
                  <p className="text-gray-300 text-xs mt-1">{formData.founderBio}</p>
                </div>

                {/* Logo & Title Box */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full border-2 border-amber-400/60 bg-zinc-950 p-2 overflow-hidden mb-3">
                    <Image
                      src={formData.logoImage || "/images/logos/newlogo (2).jpg"}
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 uppercase">
                    {formData.companyTitle}
                  </h1>
                  <p className="text-xs font-semibold tracking-widest text-amber-500/90 uppercase mt-1">
                    {formData.tagline}
                  </p>
                </div>

                {/* Services Box */}
                <div className="bg-zinc-950/80 border border-amber-500/20 rounded-2xl p-4">
                  <h3 className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3 text-center">
                    {formData.servicesTitle}
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {formData.services.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 bg-zinc-900/50 p-2 rounded-lg border border-amber-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}