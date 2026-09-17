
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Sparkles } from "lucide-react";
// import Image from "next/image";
// import axios from "axios";
// import { 
//   FaGithub, 
//   FaDiscord, 
//   FaTwitter, 
//   FaYoutube, 
//   FaFacebook, 
//   FaLinkedin, 
//   FaEnvelope, 
//   FaWhatsapp,
//   FaInstagram
// } from "react-icons/fa";

// // Dynamic Icon Config Matrix
// const ICON_MAP = {
//   github: { icon: <FaGithub size={18} />, defaultBg: "#3e4856" },
//   discord: { icon: <FaDiscord size={18} />, defaultBg: "#00b0f4" },
//   twitter: { icon: <FaTwitter size={18} />, defaultBg: "#1da1f2" },
//   youtube: { icon: <FaYoutube size={18} />, defaultBg: "#ff0000" },
//   facebook: { icon: <FaFacebook size={18} />, defaultBg: "#1877f2" },
//   linkedin: { icon: <FaLinkedin size={18} />, defaultBg: "#0a66c2" },
//   instagram: { icon: <FaInstagram size={18} />, defaultBg: "#e4405f" },
//   email: { icon: <FaEnvelope size={18} />, defaultBg: "#ea4335" },
//   whatsapp: { icon: <FaWhatsapp size={18} />, defaultBg: "#25d366" },
// };

// function About() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [socials, setSocials] = useState([]);

//   // ব্যাকএন্ড ডেটা রাখার স্টেট (ডিফল্ট ভ্যালু সহ)
//   const [aboutData, setAboutData] = useState({
//     badgeText: "Master Retoucher",
//     companyTitle: "RETOUCH LAB 360",
//     founderBio:
//       "Master retoucher with 8+ years of experience, dedicated to crafting high-end visual solutions and perfection.",
//     founderImage: "/images/logos/Arnab.jpg",
//     founderName: "ARNAB",
//     founderRole: "MEET THE FOUNDER",
//     logoImage: "/images/logos/newlogo (2).jpg",
//     services: [
//       "Pro High-End Skin Retouching",
//       "Creative Photo Manipulation",
//       "Precise E-commerce Product Editing",
//     ],
//     servicesTitle: "OUR SERVICES:",
//     tagline: "Professional Photo Retouching & Manipulation",
//   });

//   // About API থেকে ডেটা ফেচ করা
//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         const res = await fetch("https://arnab-backend.vercel.app/api/about");
//         if (res.ok) {
//           const data = await res.json();
//           setAboutData((prev) => ({
//             ...prev,
//             ...data,
//           }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch about data:", error);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   // Social Links API থেকে ডাইনামিক ডাটা ফেচ করা
//   useEffect(() => {
//     axios
//       .get("https://arnab-backend.vercel.app/api/socials")
//       .then((res) => setSocials(res.data))
//       .catch((err) => console.error("Failed to fetch socials data:", err));
//   }, []);

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
        
//         {/* ================= LEFT SECTION: Founder Details ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="lg:col-span-5 xl:col-span-4 bg-zinc-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-5 flex flex-col items-center text-center shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] transition-all duration-500 group relative"
//         >
//           {/* Dynamic Top Badge */}
//           <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
//             <Sparkles size={12} /> {aboutData.badgeText}
//           </div>

//           {/* Profile Image with Golden Aura Glow */}
//           <div
//             className="relative cursor-pointer mb-5 mt-2"
//             onClick={() =>
//               setSelectedImage({
//                 src: aboutData.founderImage || "/images/logos/Arnab.jpg",
//                 alt: aboutData.founderName,
//               })
//             }
//           >
//             {/* Pulsing Animated Aura Background */}
//             <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse" />

//             {/* Responsive Image Wrapper */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl border-2 border-amber-400/50 bg-zinc-900 overflow-hidden shadow-2xl"
//             >
//               <Image
//                 src={aboutData.founderImage || "/images/logos/Arnab.jpg"}
//                 alt={aboutData.founderName}
//                 width={400}
//                 height={400}
//                 unoptimized
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
//               {aboutData.founderRole}
//             </h3>
//             <h4 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-2">
//               {aboutData.founderName}
//             </h4>
//             <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
//               {aboutData.founderBio}
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
//             onClick={() =>
//               setSelectedImage({
//                 src: aboutData.logoImage || "/images/logos/newlogo (2).jpg",
//                 alt: aboutData.companyTitle,
//               })
//             }
//           >
//             <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />

//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.4 }}
//               className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-amber-400/60 bg-zinc-950 p-3 shadow-2xl flex items-center justify-center overflow-hidden"
//             >
//               <Image
//                 src={aboutData.logoImage || "/images/logos/newlogo (2).jpg"}
//                 alt={aboutData.companyTitle}
//                 width={300}
//                 height={300}
//                 unoptimized
//                 priority
//                 className="object-contain rounded-full w-full h-full"
//               />
//             </motion.div>
//           </div>

//           {/* Company Name */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] uppercase">
//             {aboutData.companyTitle}
//           </h1>

//           {/* Tagline */}
//           <p className="mt-3 text-xs sm:text-sm font-semibold tracking-widest text-amber-500/90 uppercase">
//             {aboutData.tagline}
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
//               {aboutData.servicesTitle}
//             </h3>
//             <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
//               {aboutData.services?.map((service, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center gap-3 justify-center lg:justify-start bg-zinc-900/50 p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition"
//                 >
//                   <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] shrink-0" />
//                   {service}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= FULLSCREEN MODEL VIEW (LIGHTBOX) ================= */}
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

//             {/* Expanded Modal Box - Full Screen Width & Height */}
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.95, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="relative w-[96vw] h-[92vh] max-w-7xl overflow-y-auto bg-zinc-950/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_100px_rgba(245,158,11,0.4)] cursor-default flex flex-col justify-center"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Full Grid Layout */}
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center h-full">
                
//                 {/* Left Side: Extra Large Image (7 Columns) */}
//                 <div className="lg:col-span-7 relative w-full h-[350px] sm:h-[450px] lg:h-[70vh] rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-black flex items-center justify-center shadow-2xl">
//                   <Image
//                     src={selectedImage.src}
//                     alt={selectedImage.alt || "Modal Preview"}
//                     width={1400}
//                     height={1400}
//                     unoptimized
//                     priority
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>

//                 {/* Right Side: Full Bio & Personal Details (5 Columns) */}
//                 <div className="lg:col-span-5 flex flex-col text-left space-y-5 text-gray-200 justify-center">
//                   <div>
//                     <span className="text-amber-400 text-xs sm:text-sm font-black tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-2">
//                       {aboutData.badgeText}
//                     </span>
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
//                       {aboutData.founderName}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-amber-500 font-bold tracking-widest uppercase mt-1">
//                       {aboutData.founderRole}
//                     </p>
//                   </div>

//                   {/* Full Bio */}
//                   <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-light">
//                     {aboutData.founderBio}
//                   </p>

//                   {/* Personal Details */}
//                   <div className="space-y-3 border-t border-amber-500/20 pt-4 text-xs sm:text-sm">
//                     <p className="flex justify-between border-b border-zinc-800 pb-2">
//                       <strong className="text-amber-400">Education:</strong> 
//                       <span className="text-gray-300">B.A. (Honours) in Bangla</span>
//                     </p>
//                     <p className="flex justify-between border-b border-zinc-800 pb-2">
//                       <strong className="text-amber-400">Email:</strong> 
//                       <span className="text-gray-300">sarkerarnab100@gmail.com</span>
//                     </p>
//                     <p className="flex justify-between border-b border-zinc-800 pb-2">
//                       <strong className="text-amber-400">Phone:</strong> 
//                       <span className="text-gray-300">+8801757385505</span>
//                     </p>
//                     <p className="flex justify-between border-b border-zinc-800 pb-2">
//                       <strong className="text-amber-400">Location:</strong> 
//                       <span className="text-gray-300">Satkhira 9400, Khulna, Bangladesh</span>
//                     </p>
//                   </div>

//                   {/* Dynamic Social Media Icons */}
//                   <div className="pt-2">
//                     <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
//                       Social Profiles
//                     </h4>
//                     <div className="flex flex-wrap gap-3">
//                       {socials.length === 0 ? (
//                         <p className="text-xs text-gray-500 italic">No social links available.</p>
//                       ) : (
//                         socials.map((item) => {
//                           const key = item.platform ? item.platform.toLowerCase() : "";
//                           const config = ICON_MAP[key] || {
//                             icon: <FaGithub size={18} />,
//                             defaultBg: "#3e4856",
//                           };

//                           return (
//                             <a
//                               key={item._id}
//                               href={item.platform === "email" ? `mailto:${item.url}` : item.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               style={{ backgroundColor: item.bgColor || config.defaultBg }}
//                               className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:scale-110 hover:opacity-90 transition-all duration-300 shadow-md"
//                               title={item.platform}
//                             >
//                               {config.icon}
//                             </a>
//                           );
//                         })
//                       )}
//                     </div>
//                   </div>

//                 </div>

//               </div>
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
import axios from "axios";
import { 
  FaGithub, 
  FaDiscord, 
  FaTwitter, 
  FaYoutube, 
  FaFacebook, 
  FaLinkedin, 
  FaEnvelope, 
  FaWhatsapp,
  FaInstagram
} from "react-icons/fa";

// Dynamic Icon Config Matrix
const ICON_MAP = {
  github: { icon: <FaGithub size={18} />, defaultBg: "#3e4856" },
  discord: { icon: <FaDiscord size={18} />, defaultBg: "#00b0f4" },
  twitter: { icon: <FaTwitter size={18} />, defaultBg: "#1da1f2" },
  youtube: { icon: <FaYoutube size={18} />, defaultBg: "#ff0000" },
  facebook: { icon: <FaFacebook size={18} />, defaultBg: "#1877f2" },
  linkedin: { icon: <FaLinkedin size={18} />, defaultBg: "#0a66c2" },
  instagram: { icon: <FaInstagram size={18} />, defaultBg: "#e4405f" },
  email: { icon: <FaEnvelope size={18} />, defaultBg: "#ea4335" },
  whatsapp: { icon: <FaWhatsapp size={18} />, defaultBg: "#25d366" },
};

function About() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [socials, setSocials] = useState([]);

  // ব্যাকএন্ড ডেটা রাখার স্টেট
  const [aboutData, setAboutData] = useState({
    badgeText: "Master Retoucher",
    companyTitle: "RETOUCH LAB 360",
    founderBio:
      "Master retoucher with 8+ years of experience, dedicated to crafting high-end visual solutions and perfection.",
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

  // About API ফেচ
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

  // Social Links API ফেচ (Fixed Logic)
  useEffect(() => {
    axios
      .get("https://arnab-backend.vercel.app/api/socials")
      .then((res) => {
        // Response Array কিনা চেক করে নিরাপদভাবে স্টেট সেটিং
        if (Array.isArray(res.data)) {
          setSocials(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setSocials(res.data.data);
        } else {
          setSocials([]);
        }
      })
      .catch((err) => console.error("Failed to fetch socials data:", err));
  }, []);

  // Modal এর জন্য Body Overflow
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
          <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Sparkles size={12} /> {aboutData.badgeText}
          </div>

          <div
            className="relative cursor-pointer mb-5 mt-2"
            onClick={() =>
              setSelectedImage({
                src: aboutData.founderImage || "/images/logos/Arnab.jpg",
                alt: aboutData.founderName,
              })
            }
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse" />

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
              
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-amber-300 text-xs font-semibold bg-black/60 px-2 py-1 rounded-md border border-amber-400/40">
                  Click to View
                </span>
              </div>
            </motion.div>
          </div>

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

          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] uppercase">
            {aboutData.companyTitle}
          </h1>

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
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-[110] p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <X size={28} strokeWidth={2.5} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[96vw] h-[92vh] max-w-7xl overflow-y-auto bg-zinc-950/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_100px_rgba(245,158,11,0.4)] cursor-default flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center h-full">
                
                <div className="lg:col-span-7 relative w-full h-[350px] sm:h-[450px] lg:h-[70vh] rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-black flex items-center justify-center shadow-2xl">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt || "Modal Preview"}
                    width={1400}
                    height={1400}
                    unoptimized
                    priority
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="lg:col-span-5 flex flex-col text-left space-y-5 text-gray-200 justify-center">
                  <div>
                    <span className="text-amber-400 text-xs sm:text-sm font-black tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-2">
                      {aboutData.badgeText}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
                      {aboutData.founderName}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-500 font-bold tracking-widest uppercase mt-1">
                      {aboutData.founderRole}
                    </p>
                  </div>

                  <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-light">
                    {aboutData.founderBio}
                  </p>

                  <div className="space-y-3 border-t border-amber-500/20 pt-4 text-xs sm:text-sm">
                    <p className="flex justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-amber-400">Education:</strong> 
                      <span className="text-gray-300">B.A. (Honours) in Bangla</span>
                    </p>
                    <p className="flex justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-amber-400">Email:</strong> 
                      <span className="text-gray-300">sarkerarnab100@gmail.com</span>
                    </p>
                    <p className="flex justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-amber-400">Phone:</strong> 
                      <span className="text-gray-300">+8801757385505</span>
                    </p>
                    <p className="flex justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-amber-400">Location:</strong> 
                      <span className="text-gray-300">Satkhira 9400, Khulna, Bangladesh</span>
                    </p>
                  </div>

                  {/* Dynamic Social Media Icons */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                      Social Profiles
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {!Array.isArray(socials) || socials.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No social links available.</p>
                      ) : (
                        socials.map((item) => {
                          const platformKey = item?.platform ? item.platform.trim().toLowerCase() : "";
                          const config = ICON_MAP[platformKey] || {
                            icon: <FaGithub size={18} />,
                            defaultBg: "#3e4856",
                          };

                          const href = platformKey === "email" 
                            ? (item.url.startsWith("mailto:") ? item.url : `mailto:${item.url}`)
                            : item.url;

                          return (
                            <a
                              key={item._id || item.url}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ backgroundColor: item.bgColor || config.defaultBg }}
                              className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:scale-110 hover:opacity-90 transition-all duration-300 shadow-md"
                              title={item.platform}
                            >
                              {config.icon}
                            </a>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default About;