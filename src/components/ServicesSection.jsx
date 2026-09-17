"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";

export default function ServicesSection() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["home-services"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/services");
      return res.data.filter((item) => item.isFeatured === true);
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-12">
        Photo Editing Services We Provide:
      </h2>

      <div className="space-y-16">
        {services.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Left Content */}
            <div className="space-y-4 text-left">
              <h3 className="text-2xl md:text-3xl font-normal text-gray-800">
                {item.categoryTitle}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                <strong className="text-gray-900">{item.priceText}</strong>{" "}
                {item.description}
              </p>

              {item.features && item.features.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {item.categoryTitle} services included:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}

<div className="pt-4">
  <Link
    href={`/category/${item.category}`}
    className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full font-bold group cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all duration-300"
  >
    {/* 1. Running Border Light Effect */}
    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#f59e0b_70%,#fbbf24_100%)]"></span>

    {/* 2. Inner Button Body (White Background & Hover Animated Arrow) */}
    <span className="relative px-8 py-2.5 bg-white text-gray-900 group-hover:bg-amber-500 group-hover:text-white rounded-full transition-all duration-300 text-xs font-black uppercase tracking-widest flex items-center gap-2 justify-center">
      <span>VIEW MORE</span>
      <span className="text-amber-500 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1.5 text-base">
        →
      </span>
    </span>
  </Link>
</div>
            </div>

            {/* Right Side: Exact Diff Slider (Pure Tailwind CSS) */}
            <PureDiffSlider
              beforeImg={item.beforeImage}
              afterImg={item.afterImage}
            />

          </div>
        ))}
      </div>
    </section>
  );
}

// Pure Tailwind Diff Effect Component
function PureDiffSlider({ beforeImg, afterImg }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-200 shadow-md select-none group">
      
      {/* 1. After Image (Background) */}
      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute bottom-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded shadow-md z-10 uppercase">
        After
      </span>

      {/* 2. Before Image (Clip Path View - Image pixel stays fixed) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded shadow-md z-10 uppercase">
          Before
        </span>
      </div>

      {/* 3. Drag Line Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 text-xs font-bold">
          ⇄
        </div>
      </div>

      {/* 4. Interactive Range Input Layer */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

    </div>
  );
}