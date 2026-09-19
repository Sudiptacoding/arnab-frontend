// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Spin } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectFade } from "swiper/modules";
// import { motion } from "framer-motion";

// // Swiper CSS
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";

// export default function CategoryPage() {
//   const { slug } = useParams();

//   const {
//     data: categoryData = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["category-items", slug],
//     queryFn: async () => {
//       const res = await axios.get(`https://arnab-backend.vercel.app/api/category?category=${slug}`);
//       return res.data;
//     },
//   });
//   console.log(categoryData);
//   if (isLoading) {
//     return (
//       <div className="h-screen bg-black flex items-center justify-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError || categoryData.length === 0) {
//     return (
//       <div className="h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
//         <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-medium text-red-400">
//           No services found for category &quot; {slug}&quot;
//         </motion.p>
//         <Link
//           href="/"
//           className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-full transition-all"
//         >
//           <ArrowLeftOutlined /> Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-zinc-950 text-white min-h-screen pb-20 select-none">
//       {/* ================= TOP NAVIGATION BAR ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between border-b border-zinc-800"
//       >
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-amber-500 hover:text-black text-gray-300 font-medium px-4 py-2 rounded-full border border-zinc-700 transition-all text-sm"
//         >
//           <ArrowLeftOutlined /> Back to Home
//         </Link>

//         <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider text-amber-500">{slug} Category</h1>
//       </motion.div>

//       {/* ================= HERO BANNER SLIDER WITH CLEAR IMAGE & MOTION ================= */}
//       <section className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] bg-black overflow-hidden border-b border-zinc-800">
//         <Swiper
//           modules={[Autoplay, Navigation, EffectFade]}
//           effect="fade"
//           speed={800}
//           autoplay={{
//             delay: 4500,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           navigation={true}
//           className="w-full h-full category-swiper"
//         >
//           {categoryData.map((item) => (
//             <SwiperSlide key={item.id} className="w-full h-full">
//               {({ isActive }) => (
//                 <div className="relative w-full h-full flex flex-col items-center justify-center">
//                   {/* Clear Image View Diff Component */}
//                   <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={true} />

//                   {/* Motion Text Overlay */}
//                   {isActive && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, ease: "easeOut" }}
//                       className="absolute bottom-8 left-6 right-6 md:left-12 z-40 pointer-events-none max-w-2xl bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
//                     >
//                       <motion.h2
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
//                       >
//                         {item.categoryTitle}
//                       </motion.h2>
//                       <motion.p
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.35 }}
//                         className="text-amber-400 font-bold text-sm sm:text-base mt-2"
//                       >
//                         {item.priceText}
//                       </motion.p>
//                     </motion.div>
//                   )}
//                 </div>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* ================= CARDS SECTION WITH ANIMATED GRID ================= */}
//       <section className="max-w-7xl mx-auto px-4 mt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
//             All Services in <span className="text-amber-500">{slug}</span>
//           </h2>
//           <p className="text-gray-400 text-sm mt-2">Drag the slider on any card to compare Before and After results</p>
//         </motion.div>

//         {/* Motion Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {categoryData.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -6 }}
//               className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-4 flex flex-col justify-between shadow-xl hover:border-amber-500/50 transition-all duration-300"
//             >
//               <div>
//                 <div className="w-full h-[280px] rounded-xl overflow-hidden mb-4 bg-black">
//                   <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={false} />
//                 </div>

//                 <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white uppercase tracking-wide">
//                   {item.categoryTitle}
//                 </motion.h3>

//                 <p className="text-amber-500 font-bold text-sm mt-1 mb-3">{item.priceText}</p>

//                 <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">{item.description}</p>
//               </div>

//               {item.features && item.features.length > 0 && (
//                 <ul className="mt-4 pt-4 border-t border-zinc-800 text-xs text-gray-400 space-y-1.5">
//                   {item.features.slice(0, 3).map((feat, idx) => (
//                     <li key={idx} className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
//                       {feat}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// // ================= CLEAR VIEW PURE DIFF SLIDER COMPONENT =================
// function PureDiffSlider({ beforeImg, afterImg, heightClass = "h-full", isBanner = false }) {
//   const [position, setPosition] = useState(50);

//   return (
//     <div className={`relative w-full ${heightClass} overflow-hidden select-none bg-black group`}>
//       {/* Background Blur Image Layer for Aspect Ratio Fitting */}
//       {isBanner && (
//         <div className="absolute inset-0 opacity-30 blur-2xl pointer-events-none overflow-hidden">
//           <img src={afterImg} alt="" className="w-full h-full object-cover" />
//         </div>
//       )}

//       {/* 1. After Image (Crisp & Clear Object Display) */}
//       <img
//         src={afterImg}
//         alt="After"
//         className={`absolute inset-0 w-full h-full ${isBanner ? "object-contain" : "object-cover"} pointer-events-none z-0`}
//       />
//       <span className="absolute bottom-4 right-4 bg-amber-500 text-black text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider">
//         After
//       </span>

//       {/* 2. Before Image (Clip-path View with Proper Image Fit) */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
//         <img src={beforeImg} alt="Before" className={`absolute inset-0 w-full h-full ${isBanner ? "object-contain" : "object-cover"}`} />
//         <span className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider border border-white/20">
//           Before
//         </span>
//       </div>

//       {/* 3. Drag Divider Line */}
//       <div
//         className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
//         style={{ left: `${position}%` }}
//       >
//         <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-300 text-xs font-bold">
//           ⇄
//         </div>
//       </div>

//       {/* 4. Interactive Range Input Control Layer */}
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={position}
//         onChange={(e) => setPosition(Number(e.target.value))}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
//       />
//     </div>
//   );
// }



// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Spin } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectFade } from "swiper/modules";
// import { motion } from "framer-motion";

// // Swiper CSS
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";

// export default function CategoryPage() {
//   const { slug } = useParams();

//   const {
//     data: categoryData = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["category-items", slug],
//     queryFn: async () => {
//       const res = await axios.get(`https://arnab-backend.vercel.app/api/category?category=${slug}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="h-screen bg-black flex items-center justify-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError || categoryData.length === 0) {
//     return (
//       <div className="h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
//         <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-medium text-red-400">
//           No services found for category &quot;{slug}&quot;
//         </motion.p>
//         <Link
//           href="/"
//           className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-full transition-all"
//         >
//           <ArrowLeftOutlined /> Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-zinc-950 text-white min-h-screen pb-20 select-none">
//       {/* ================= TOP NAVIGATION BAR ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between border-b border-zinc-800"
//       >
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-amber-500 hover:text-black text-gray-300 font-medium px-4 py-2 rounded-full border border-zinc-700 transition-all text-sm"
//         >
//           <ArrowLeftOutlined /> Back to Home
//         </Link>

//         <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider text-amber-500">{slug} Category</h1>
//       </motion.div>

//       {/* ================= HERO BANNER SLIDER WITH CLEAR IMAGE & MOTION ================= */}
//       <section className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] bg-black overflow-hidden border-b border-zinc-800">
//         <Swiper
//           modules={[Autoplay, Navigation, EffectFade]}
//           effect="fade"
//           speed={800}
//           autoplay={{
//             delay: 4500,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           navigation={true}
//           className="w-full h-full category-swiper"
//         >
//           {categoryData.map((item) => (
//             <SwiperSlide key={item.id} className="w-full h-full">
//               {({ isActive }) => (
//                 <div className="relative w-full h-full flex flex-col items-center justify-center">
//                   <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={true} />

//                   {isActive && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, ease: "easeOut" }}
//                       className="absolute bottom-8 left-6 right-6 md:left-12 z-40 pointer-events-none max-w-2xl bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
//                     >
//                       <motion.h2
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
//                       >
//                         {item.categoryTitle}
//                       </motion.h2>
//                       <motion.p
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.35 }}
//                         className="text-amber-400 font-bold text-sm sm:text-base mt-2"
//                       >
//                         {item.priceText}
//                       </motion.p>
//                     </motion.div>
//                   )}
//                 </div>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* ================= CARDS SECTION WITH ANIMATED GRID ================= */}
//       <section className="max-w-7xl mx-auto px-4 mt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
//             All Services in <span className="text-amber-500">{slug}</span>
//           </h2>
//           <p className="text-gray-400 text-sm mt-2">Drag the slider on any card to compare Before and After results</p>
//         </motion.div>

//         {/* Motion Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {categoryData.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -6 }}
//               className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-4 flex flex-col justify-between shadow-xl hover:border-amber-500/50 transition-all duration-300"
//             >
//               <div>
//                 {/* Grid image container height aspect-ratio responsive kora hoyeche */}
//                 <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black">
//                   <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} heightClass="h-full" isBanner={false} />
//                 </div>

//                 <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white uppercase tracking-wide">
//                   {item.categoryTitle}
//                 </motion.h3>

//                 <p className="text-amber-500 font-bold text-sm mt-1 mb-3">{item.priceText}</p>

//                 <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">{item.description}</p>
//               </div>

//               {item.features && item.features.length > 0 && (
//                 <ul className="mt-4 pt-4 border-t border-zinc-800 text-xs text-gray-400 space-y-1.5">
//                   {item.features.slice(0, 3).map((feat, idx) => (
//                     <li key={idx} className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
//                       {feat}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// // ================= CLEAR VIEW PURE DIFF SLIDER COMPONENT =================
// function PureDiffSlider({ beforeImg, afterImg, heightClass = "h-full", isBanner = false }) {
//   const [position, setPosition] = useState(50);

//   return (
//     <div className={`relative w-full ${heightClass} overflow-hidden select-none bg-black group`}>
//       {/* Background Blur Image Layer for Aspect Ratio Fitting */}
//       {isBanner && (
//         <div className="absolute inset-0 opacity-30 blur-2xl pointer-events-none overflow-hidden">
//           <img src={afterImg} alt="" className="w-full h-full object-cover" />
//         </div>
//       )}

//       {/* 1. After Image (object-contain use kora hoyeche grid card image pura dekhanor jonno) */}
//       <img
//         src={afterImg}
//         alt="After"
//         className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
//       />
//       <span className="absolute bottom-4 right-4 bg-amber-500 text-black text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider">
//         After
//       </span>

//       {/* 2. Before Image (object-contain use kora hoyeche grid card image pura dekhanor jonno) */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
//         <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-contain" />
//         <span className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider border border-white/20">
//           Before
//         </span>
//       </div>

//       {/* 3. Drag Divider Line */}
//       <div
//         className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
//         style={{ left: `${position}%` }}
//       >
//         <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-300 text-xs font-bold">
//           ⇄
//         </div>
//       </div>

//       {/* 4. Interactive Range Input Control Layer */}
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={position}
//         onChange={(e) => setPosition(Number(e.target.value))}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
//       />
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import { ArrowLeftOutlined, CloseOutlined, ExpandOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function CategoryPage() {
  const { slug } = useParams();

  // Selected Image Pair State for Fullscreen Modal
  const [modalData, setModalData] = useState(null);

  const {
    data: categoryData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-items", slug],
    queryFn: async () => {
      const res = await axios.get(`https://arnab-backend.vercel.app/api/category?category=${slug}`);
      return res.data;
    },
  });

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
          No services found for category &quot;{slug}&quot;
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

      {/* ================= HERO BANNER SLIDER ================= */}
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
                  <BannerDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} />

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
          <p className="text-gray-400 text-sm mt-2">Click on any image to view full screen side-by-side comparison</p>
        </motion.div>

        {/* Motion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
                {/* Clickable Image Container */}
                <div 
                  onClick={() => setModalData(item)}
                  className="mb-4 cursor-pointer relative group/img overflow-hidden rounded-2xl"
                >
                  <PureDiffSlider beforeImg={item.beforeImage} afterImg={item.afterImage} />
                  
                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-40 flex items-center justify-center gap-2 text-white font-bold text-sm pointer-events-none">
                    <ExpandOutlined className="text-amber-500 text-lg" />
                    <span>Click for Fullscreen View</span>
                  </div>
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

      {/* ================= 100% FULL SCREEN ULTRA LARGE MODAL ================= */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalData(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl w-screen h-screen flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none"
          >
            {/* Top Bar Header */}
            <div className="w-full flex items-center justify-between z-20 pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-4">
                <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
                  {modalData.categoryTitle}
                </h3>
                <span className="hidden sm:inline-block bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {modalData.priceText}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setModalData(null)}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-amber-500 hover:text-black text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-lg"
              >
                <span>Close</span>
                <CloseOutlined className="text-base" />
              </button>
            </div>

            {/* Side-by-Side Ultra Large Image View Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="w-full h-[calc(100vh-90px)] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 items-center justify-center overflow-hidden"
            >
              {/* BEFORE IMAGE BOX */}
              <div className="relative w-full h-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-2 group">
                <span className="absolute top-4 left-4 bg-black/80 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-lg border border-white/20 z-20 uppercase tracking-widest backdrop-blur-md">
                  Before
                </span>
                <img
                  src={modalData.beforeImage}
                  alt="Before View"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              {/* AFTER IMAGE BOX */}
              <div className="relative w-full h-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-2 group">
                <span className="absolute top-4 right-4 bg-amber-500 text-black text-xs sm:text-sm font-black px-4 py-1.5 rounded-lg shadow-lg z-20 uppercase tracking-widest">
                  After
                </span>
                <img
                  src={modalData.afterImage}
                  alt="After View"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Pure Tailwind Diff Effect Component (Dynamic Auto-Height Fix for Cards)
function PureDiffSlider({ beforeImg, afterImg }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-md select-none group">
      {/* 1. Base Hidden Image for height auto-calculation */}
      <img
        src={afterImg}
        alt="Aspect Ratio Reference"
        className="w-full h-auto block opacity-0 pointer-events-none"
      />

      {/* 2. After Image */}
      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
      />
      <span className="absolute bottom-3 right-3 bg-amber-500 text-black text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded shadow-md z-10 uppercase">
        After
      </span>

      {/* 3. Before Image */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before"
          className="absolute inset-0 w-full h-full object-fill"
        />
        <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded shadow-md z-10 uppercase border border-white/20">
          Before
        </span>
      </div>

      {/* 4. Drag Line Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 text-xs font-bold">
          ⇄
        </div>
      </div>

      {/* 5. Interactive Range Input Layer */}
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

// Banner Slider Component
function BannerDiffSlider({ beforeImg, afterImg }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black group">
      <div className="absolute inset-0 opacity-30 blur-2xl pointer-events-none overflow-hidden">
        <img src={afterImg} alt="" className="w-full h-full object-cover" />
      </div>

      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
      />
      <span className="absolute bottom-4 right-4 bg-amber-500 text-black text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider">
        After
      </span>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-contain" />
        <span className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded shadow-lg z-20 uppercase tracking-wider border border-white/20">
          Before
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-300 text-xs font-bold">
          ⇄
        </div>
      </div>

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