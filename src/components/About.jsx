

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Award, Sparkles } from "lucide-react";
// import Image from "next/image";

// function About() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Modal খোলা থাকলে মূল পেজের স্ক্রল বন্ধ রাখার জন্য
//   useEffect(() => {
//     if (selectedImage) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [selectedImage]);

//   return (
//     <div className="relative w-full min-h-[600px] sm:h-[650px] bg-black text-white py-10 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden">
//       {/* Dynamic Background Glow Effects */}
//       <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

//       {/* Main Grid Container */}
//       <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
//         {/* ================= LEFT SECTION: Founder Details (Updated UI) ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="lg:col-span-5 xl:col-span-4 bg-zinc-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-5 flex flex-col items-center text-center shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] transition-all duration-500 group relative"
//         >
//           {/* Subtle Top Badge */}
//           <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
//             <Sparkles size={12} /> Master Retoucher
//           </div>

//           {/* Profile Image with Golden Aura Glow */}
//           <div
//             className="relative cursor-pointer mb-5 mt-2"
//             onClick={() => setSelectedImage({ src: "/images/logos/Arnab.jpg", alt: "Arnab - Founder & Lead Retoucher" })}
//           >
//             {/* Pulsing Animated Aura Background */}
//             <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse" />

//             {/* Responsive Image Wrapper (Prominent & Large) */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl border-2 border-amber-400/50 bg-zinc-900 overflow-hidden shadow-2xl"
//             >
//               <Image
//                 src="/images/logos/Arnab.jpg"
//                 alt="Arnab - Founder"
//                 width={400}
//                 height={400}
//                 priority
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />
              
//               {/* Overlay Hint for Click */}
//               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <span className="text-amber-300 text-xs font-semibold bg-black/60 px-2 py-1 rounded-md border border-amber-400/40">
//                   Click to View
//                 </span>
//               </div>
//             </motion.div>
//           </div>

//           {/* Text Content */}
//           <div className="w-full">
//             <h3 className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-1">
//               MEET THE FOUNDER
//             </h3>
//             <h4 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-2">
//               ARNAB
//             </h4>
//             <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
//               Master retoucher with 15+ years of experience, dedicated to crafting high-end visual solutions and perfection.
//             </p>
//           </div>
//         </motion.div>

//         {/* ================= CENTER SECTION: Main Logo & Brand Title ================= */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//           className="lg:col-span-7 xl:col-span-4 flex flex-col items-center text-center my-4 lg:my-0"
//         >
//           {/* Logo Container */}
//           <div
//             className="relative group cursor-pointer mb-6"
//             onClick={() => setSelectedImage({ src: "/images/logos/newlogo (2).jpg", alt: "Retouch Lab 360 Logo" })}
//           >
//             <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />

//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.4 }}
//               className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-amber-400/60 bg-zinc-950 p-3 shadow-2xl flex items-center justify-center overflow-hidden"
//             >
//               <Image
//                 src="/images/logos/newlogo (2).jpg"
//                 alt="Retouch Lab 360 Logo"
//                 width={300}
//                 height={300}
//                 priority
//                 className="object-contain rounded-full w-full h-full"
//               />
//             </motion.div>
//           </div>

//           {/* Company Name */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] uppercase">
//             RETOUCH LAB 360
//           </h1>

//           {/* Tagline */}
//           <p className="mt-3 text-xs sm:text-sm font-semibold tracking-widest text-amber-500/90 uppercase">
//             Professional Photo Retouching & Manipulation
//           </p>
//         </motion.div>

//         {/* ================= RIGHT SECTION: Services Box ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
//           className="lg:col-span-12 xl:col-span-4 flex flex-col gap-4"
//         >
//           <div className="bg-zinc-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:border-amber-500/50 transition-all duration-300">
//             <h3 className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-center lg:text-left">
//               OUR SERVICES:
//             </h3>
//             <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
//               <li className="flex items-center gap-3 justify-center lg:justify-start bg-zinc-900/50 p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition">
//                 <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
//                 Pro High-End Skin Retouching
//               </li>
//               <li className="flex items-center gap-3 justify-center lg:justify-start bg-zinc-900/50 p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition">
//                 <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
//                 Creative Photo Manipulation
//               </li>
//               <li className="flex items-center gap-3 justify-center lg:justify-start bg-zinc-900/50 p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition">
//                 <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
//                 Precise E-commerce Product Editing
//               </li>
//             </ul>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= FULLSCREEN MODEL VIEW (AWESOME LIGHTBOX) ================= */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedImage(null)}
//             className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-5 right-5 z-[110] p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
//             >
//               <X size={28} strokeWidth={2.5} />
//             </button>

//             {/* Expanded Modal Box */}
//             <motion.div
//               initial={{ scale: 0.7, opacity: 0, y: 30 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.7, opacity: 0, y: 30 }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="relative w-auto h-auto max-w-[92vw] max-h-[88vh] flex items-center justify-center rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_0_80px_rgba(245,158,11,0.35)] bg-zinc-950 p-2 sm:p-4 cursor-default"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Image
//                 src={selectedImage.src}
//                 alt={selectedImage.alt}
//                 width={1200}
//                 height={1200}
//                 priority
//                 className="w-auto h-auto max-w-[88vw] max-h-[82vh] object-contain rounded-2xl"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default About;


"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Image from "next/image";

function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  // ব্যাকএন্ড ডেটা রাখার স্টেট (ডিফল্ট ভ্যালু সহ)
  const [aboutData, setAboutData] = useState({
    badgeText: "Master Retoucher",
    companyTitle: "RETOUCH LAB 360",
    founderBio:
      "Master retoucher with 15+ years of experience, dedicated to crafting high-end visual solutions and perfection.",
    founderImage: "/images/logos/Arnab.jpg",
    founderName: "ARNAB",
    founderRole: "MEET THE FOUNDER",
    logoImage: "/images/logos/newlogo (2).jpg",
    services: [
      "Pro High-End Skin Retouching",
      "Creative Photo Manipulation",
      "Precise E-commerce Product Editing",
    ],
    servicesTitle: "OUR SERVICES:",
    tagline: "Professional Photo Retouching & Manipulation",
  });

  // API থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch("https://arnab-backend.vercel.app/api/about");
        if (res.ok) {
          const data = await res.json();
          setAboutData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // Modal খোলা থাকলে মূল পেজের স্ক্রল বন্ধ রাখার জন্য
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="relative w-full min-h-[600px] sm:h-[650px] bg-black text-white py-10 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid Container */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* ================= LEFT SECTION: Founder Details ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 xl:col-span-4 bg-zinc-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-5 flex flex-col items-center text-center shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] transition-all duration-500 group relative"
        >
          {/* Dynamic Top Badge */}
          <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Sparkles size={12} /> {aboutData.badgeText}
          </div>

          {/* Profile Image with Golden Aura Glow */}
          <div
            className="relative cursor-pointer mb-5 mt-2"
            onClick={() =>
              setSelectedImage({
                src: aboutData.founderImage || "/images/logos/Arnab.jpg",
                alt: aboutData.founderName,
              })
            }
          >
            {/* Pulsing Animated Aura Background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse" />

            {/* Responsive Image Wrapper */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl border-2 border-amber-400/50 bg-zinc-900 overflow-hidden shadow-2xl"
            >
              <Image
                src={aboutData.founderImage || "/images/logos/Arnab.jpg"}
                alt={aboutData.founderName}
                width={400}
                height={400}
                unoptimized
                priority
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              
              {/* Overlay Hint for Click */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-amber-300 text-xs font-semibold bg-black/60 px-2 py-1 rounded-md border border-amber-400/40">
                  Click to View
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="w-full">
            <h3 className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-1">
              {aboutData.founderRole}
            </h3>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-2">
              {aboutData.founderName}
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              {aboutData.founderBio}
            </p>
          </div>
        </motion.div>

        {/* ================= CENTER SECTION: Main Logo & Brand Title ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 xl:col-span-4 flex flex-col items-center text-center my-4 lg:my-0"
        >
          {/* Logo Container */}
          <div
            className="relative group cursor-pointer mb-6"
            onClick={() =>
              setSelectedImage({
                src: aboutData.logoImage || "/images/logos/newlogo (2).jpg",
                alt: aboutData.companyTitle,
              })
            }
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-amber-400/60 bg-zinc-950 p-3 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <Image
                src={aboutData.logoImage || "/images/logos/newlogo (2).jpg"}
                alt={aboutData.companyTitle}
                width={300}
                height={300}
                unoptimized
                priority
                className="object-contain rounded-full w-full h-full"
              />
            </motion.div>
          </div>

          {/* Company Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] uppercase">
            {aboutData.companyTitle}
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-xs sm:text-sm font-semibold tracking-widest text-amber-500/90 uppercase">
            {aboutData.tagline}
          </p>
        </motion.div>

        {/* ================= RIGHT SECTION: Services Box ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-12 xl:col-span-4 flex flex-col gap-4"
        >
          <div className="bg-zinc-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:border-amber-500/50 transition-all duration-300">
            <h3 className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-center lg:text-left">
              {aboutData.servicesTitle}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
              {aboutData.services?.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start bg-zinc-900/50 p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* ================= FULLSCREEN MODEL VIEW (LIGHTBOX) ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-[110] p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <X size={28} strokeWidth={2.5} />
            </button>

            {/* Expanded Modal Box */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-auto h-auto max-w-[92vw] max-h-[88vh] flex items-center justify-center rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_0_80px_rgba(245,158,11,0.35)] bg-zinc-950 p-2 sm:p-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || "Modal Preview"}
                width={1200}
                height={1200}
                unoptimized
                priority
                className="w-auto h-auto max-w-[88vw] max-h-[82vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default About;