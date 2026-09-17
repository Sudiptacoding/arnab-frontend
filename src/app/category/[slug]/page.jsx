"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function CategoryPage() {
  const { slug } = useParams();

  const {
    data: categoryData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-items", slug],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/category?category=${slug}`);
      return res.data;
    },
  });
  console.log(categoryData);
  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || categoryData.length === 0) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-medium text-red-400">
          No services found for category &quot; {slug}&quot;
        </motion.p>
        <Link
          href="/"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-full transition-all"
        >
          <ArrowLeftOutlined /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pb-20 select-none">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between border-b border-zinc-800"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-amber-500 hover:text-black text-gray-300 font-medium px-4 py-2 rounded-full border border-zinc-700 transition-all text-sm"
        >
          <ArrowLeftOutlined /> Back to Home
        </Link>

        <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider text-amber-500">{slug} Category</h1>
      </motion.div>

      {/* ================= HERO BANNER SLIDER WITH CLEAR IMAGE & MOTION ================= */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] bg-black overflow-hidden border-b border-zinc-800">
        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          speed={800}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          className="w-full h-full category-swiper"
        >
          {categoryData.map((item) => (
            <SwiperSlide key={item.id} className="w-full h-full">
              {({ isActive }) => (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Clear Image View Diff Component */}
                  <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={true} />

                  {/* Motion Text Overlay */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute bottom-8 left-6 right-6 md:left-12 z-40 pointer-events-none max-w-2xl bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
                    >
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
                      >
                        {item.categoryTitle}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="text-amber-400 font-bold text-sm sm:text-base mt-2"
                      >
                        {item.priceText}
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= CARDS SECTION WITH ANIMATED GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
            All Services in <span className="text-amber-500">{slug}</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">Drag the slider on any card to compare Before and After results</p>
        </motion.div>

        {/* Motion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-4 flex flex-col justify-between shadow-xl hover:border-amber-500/50 transition-all duration-300"
            >
              <div>
                <div className="w-full h-[280px] rounded-xl overflow-hidden mb-4 bg-black">
                  <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={false} />
                </div>

                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white uppercase tracking-wide">
                  {item.categoryTitle}
                </motion.h3>

                <p className="text-amber-500 font-bold text-sm mt-1 mb-3">{item.priceText}</p>

                <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">{item.description}</p>
              </div>

              {item.features && item.features.length > 0 && (
                <ul className="mt-4 pt-4 border-t border-zinc-800 text-xs text-gray-400 space-y-1.5">
                  {item.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ================= CLEAR VIEW PURE DIFF SLIDER COMPONENT =================
function PureDiffSlider({ beforeImg, afterImg, heightClass = "h-full", isBanner = false }) {
  const [position, setPosition] = useState(50);

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden select-none bg-black group`}>
      {/* Background Blur Image Layer for Aspect Ratio Fitting */}
      {isBanner && (
        <div className="absolute inset-0 opacity-30 blur-2xl pointer-events-none overflow-hidden">
          <img src={afterImg} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* 1. After Image (Crisp & Clear Object Display) */}
      <img
        src={afterImg}
        alt="After"
        className={`absolute inset-0 w-full h-full ${isBanner ? "object-contain" : "object-cover"} pointer-events-none z-0`}
      />
      <span className="absolute bottom-4 right-4 bg-amber-500 text-black text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider">
        After
      </span>

      {/* 2. Before Image (Clip-path View with Proper Image Fit) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImg} alt="Before" className={`absolute inset-0 w-full h-full ${isBanner ? "object-contain" : "object-cover"}`} />
        <span className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider border border-white/20">
          Before
        </span>
      </div>

      {/* 3. Drag Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-300 text-xs font-bold">
          ⇄
        </div>
      </div>

      {/* 4. Interactive Range Input Control Layer */}
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
