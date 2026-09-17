

// "use client";
// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectFade } from "swiper/modules";
// import { Spin } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { motion } from "framer-motion";

// // Swiper CSS Styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";

// export default function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hoveredSide, setHoveredSide] = useState(null); // 'before' | 'after' | null
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   // API থেকে সরাসরি সমস্ত ডাটা লোড করা হচ্ছে (কোন ফিল্টার ছাড়াই)
//   const { data: services = [], isLoading, isError } = useQuery({
//     queryKey: ['hero-all-services'],
//     queryFn: async () => {
//       const res = await axios.get("http://localhost:5000/api/header");
//       return res.data; // API-র সব ডাটা সরাসরি রিটার্ন করছে
//     }
//   });

//   if (isLoading) {
//     return (
//       <div className="h-[550px] flex items-center justify-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError || services.length === 0) {
//     return (
//       <div className="h-[550px] flex items-center justify-center text-red-500 font-medium">
//         Failed to load Hero Slider Data!
//       </div>
//     );
//   }

//   return (
//     <section className="relative w-full bg-white overflow-hidden py-8 md:py-14 border-b border-gray-100">
      
//       {/* Slide Index Counter */}
//       <div className="absolute top-4 right-6 md:right-16 z-20 text-xs md:text-sm font-semibold text-gray-500 tracking-wider">
//         {currentIndex}/{services.length}
//       </div>

//       {/* Custom Left Nav Button */}
//       <button 
//         ref={prevRef}
//         aria-label="Previous Slide"
//         className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-amber-500 hover:text-white rounded-full flex items-center justify-center transition-all text-gray-700 shadow-md cursor-pointer"
//       >
//         <LeftOutlined />
//       </button>

//       {/* Custom Right Nav Button */}
//       <button 
//         ref={nextRef}
//         aria-label="Next Slide"
//         className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-amber-500 hover:text-white rounded-full flex items-center justify-center transition-all text-gray-700 shadow-md cursor-pointer"
//       >
//         <RightOutlined />
//       </button>

//       {/* Swiper Slider */}
//       <Swiper
//         modules={[Autoplay, Navigation, EffectFade]}
//         effect="fade"
//         speed={800}
//         loop={services.length > 1}
//         autoplay={{ 
//           delay: 3500, 
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true // মাউস রাখলে অটো-স্লাইড পজ বা বন্ধ হয়ে যাবে
//         }}
//         onSlideChange={(swiper) => {
//           setCurrentIndex(swiper.realIndex + 1);
//           setHoveredSide(null);
//         }}
//         onBeforeInit={(swiper) => {
//           swiper.params.navigation.prevEl = prevRef.current;
//           swiper.params.navigation.nextEl = nextRef.current;
//         }}
//         onInit={(swiper) => {
//           swiper.navigation.init();
//           swiper.navigation.update();
//         }}
//         className="w-full max-w-7xl mx-auto"
//       >
//         {services.map((item) => (
//           <SwiperSlide key={item.id}>
//             {({ isActive }) => (
//               <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[480px] px-6 sm:px-12 md:px-16 gap-8">
                
//                 {/* Images Container (Before / After Hover FX) */}
//                 <div className="lg:col-span-6 flex items-center justify-center gap-3 sm:gap-4 w-full py-4">
                  
//                   {/* Left Image: Before */}
//                   <div 
//                     onMouseEnter={() => setHoveredSide('before')}
//                     onMouseLeave={() => setHoveredSide(null)}
//                     className={`relative h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${
//                       hoveredSide === 'before' 
//                         ? 'w-[65%] max-w-[360px] shadow-2xl ring-2 ring-amber-500' 
//                         : hoveredSide === 'after' 
//                         ? 'w-[35%] max-w-[180px] opacity-80' 
//                         : 'w-[50%] max-w-[300px]'
//                     }`}
//                   >
//                     <img 
//                       src={item.beforeImage} 
//                       alt="Before" 
//                       className="w-full h-full object-cover transition-all duration-500"
//                     />
//                     <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
//                       Before
//                     </span>
//                   </div>

//                   {/* Right Image: After */}
//                   <div 
//                     onMouseEnter={() => setHoveredSide('after')}
//                     onMouseLeave={() => setHoveredSide(null)}
//                     className={`relative h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${
//                       hoveredSide === 'after' 
//                         ? 'w-[65%] max-w-[360px] shadow-2xl ring-2 ring-amber-500' 
//                         : hoveredSide === 'before' 
//                         ? 'w-[35%] max-w-[180px] opacity-80' 
//                         : 'w-[50%] max-w-[300px]'
//                     }`}
//                   >
//                     <img 
//                       src={item.afterImage} 
//                       alt="After" 
//                       className="w-full h-full object-cover transition-all duration-500"
//                     />
//                     <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
//                       After
//                     </span>
//                   </div>

//                 </div>

//                 {/* Right Side Text Details */}
//                 <div className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center space-y-4">
//                   {isActive && (
//                     <>
//                       {/* Title */}
//                       <motion.h1 
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, ease: "easeOut" }}
//                         className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight uppercase"
//                       >
//                         {item.categoryTitle}
//                       </motion.h1>

//                       {/* Price Text & Description */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
//                         className="space-y-2"
//                       >
//                         <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                           <strong className="text-amber-600 font-bold">{item.priceText}</strong>{" "}
//                           {item.description}
//                         </p>
//                       </motion.div>

//                       {/* Features List */}
//                       {item.features && item.features.length > 0 && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
//                           className="pt-1 text-left"
//                         >
//                           <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
//                             Included Services:
//                           </p>
//                           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-600">
//                             {item.features.map((feat, idx) => (
//                               <li key={idx} className="flex items-center gap-2">
//                                 <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
//                                 {feat}
//                               </li>
//                             ))}
//                           </ul>
//                         </motion.div>
//                       )}

//                       {/* VIEW MORE Button with Border Glow & Animated Arrow */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
//                         className="pt-3 flex justify-center lg:justify-start"
//                       >
//                         <Link
//                           href={`/category/${item.category}`}
//                           className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full font-bold group cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all duration-300"
//                         >
//                           {/* Running Border Light Effect */}
//                           <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#f59e0b_70%,#fbbf24_100%)]"></span>

//                           {/* Inner Button Body */}
//                           <span className="relative px-8 py-2.5 bg-white text-gray-900 group-hover:bg-amber-500 group-hover:text-black rounded-full transition-all duration-300 text-xs font-black uppercase tracking-widest flex items-center gap-2 justify-center">
//                             <span>VIEW MORE</span>
//                             <span className="text-amber-500 group-hover:text-black transition-transform duration-300 group-hover:translate-x-1.5 text-base">
//                               →
//                             </span>
//                           </span>
//                         </Link>
//                       </motion.div>

//                     </>
//                   )}
//                 </div>

//               </div>
//             )}
//           </SwiperSlide>
//         ))}
//       </Swiper>
      
//     </section>
//   );
// }


"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

// Swiper CSS Styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // API থেকে ডাটা লোড
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['hero-all-services'],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/header");
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="h-[450px] w-full flex items-center justify-center bg-gray-950">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || services.length === 0) {
    return (
      <div className="h-[450px] w-full flex items-center justify-center text-red-500 font-medium bg-gray-950">
        Failed to load Hero Slider Data!
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-black p-0 m-0 group">
      
      {/* Slide Index Counter */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 z-30 px-3.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs md:text-sm font-bold text-white tracking-widest border border-white/20 shadow-lg">
        {currentIndex}/{services.length}
      </div>

      {/* Custom Left Nav Button */}
      <button 
        ref={prevRef}
        aria-label="Previous Slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-amber-500 hover:text-black text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100"
      >
        <LeftOutlined className="text-base md:text-lg" />
      </button>

      {/* Custom Right Nav Button */}
      <button 
        ref={nextRef}
        aria-label="Next Slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-amber-500 hover:text-black text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100"
      >
        <RightOutlined className="text-base md:text-lg" />
      </button>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Navigation]}
        speed={800}
        loop={services.length > 1}
        autoplay={{ 
          delay: 4500, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-auto min-h-[300px]" 
      >
        {services.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full p-0 m-0 overflow-hidden flex items-center justify-center">
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                
                {/* 
                   Advanced Ultra-Sharp Upscaled Display Engine
                   - quality={100} & unoptimized: ImageBB এর ইমেজ রেজুলেশন নষ্ট হওয়া বন্ধ করবে
                   - contrast & brightness sharpening filter: ব্লার ভাব দূর করে ইমেজ HD শার্প করবে
                */}
                <Image 
                  src={item.headerimage} 
                  alt={item.category || "Header Banner"} 
                  width={2560}
                  height={1440}
                  priority={index === 0}
                  unoptimized={true} // ImageBB-এর মূল ফাইল সরাসরি রেন্ডার করবে
                  className="w-full h-auto max-h-[700px] object-cover block select-none transform-gpu transition-all duration-500"
                  style={{
                    filter: "contrast(108%) brightness(102%) saturate(105%)", // শার্পনেস এবং কন্ট্রাস্ট আপস্কেলিং
                    imageRendering: "-webkit-optimize-contrast", 
                    shapeRendering: "geometricPrecision",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translateZ(0)"
                  }}
                />

                {/* Bottom Right Category Button */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="absolute bottom-5 right-5 md:bottom-8 md:right-10 z-40"
                  >
                    <Link
                      href={`/category/${item.category}`}
                      className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full font-bold group cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transition-all duration-300"
                    >
                      {/* Animated Glow Border */}
                      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#f59e0b_70%,#fbbf24_100%)]"></span>

                      {/* Inner Button Content */}
                      <span className="relative px-6 py-2.5 md:px-8 md:py-3 bg-black/85 backdrop-blur-md text-white group-hover:bg-amber-500 group-hover:text-black rounded-full transition-all duration-300 text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-2 justify-center">
                        <span>{item.category}</span>
                        <span className="text-amber-500 group-hover:text-black transition-transform duration-300 group-hover:translate-x-1.5 text-base md:text-lg">
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                )}
                
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  );
}