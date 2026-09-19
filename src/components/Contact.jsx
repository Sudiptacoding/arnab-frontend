"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaDiscord, FaTwitter, FaYoutube, FaFacebook, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await axios.post("https://arnab-backend.vercel.app/api/contact", formData);
      setStatus({ type: "success", msg: res.data.message || "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ 
        type: "error", 
        msg: err.response?.data?.message || "Something went wrong. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Icon Map
const ICON_MAP = {
  github: { icon: <FaGithub size={18} />, defaultBg: "#3e4856" },
  discord: { icon: <FaDiscord size={18} />, defaultBg: "#00b0f4" },
  twitter: { icon: <FaTwitter size={18} />, defaultBg: "#1da1f2" },
  youtube: { icon: <FaYoutube size={18} />, defaultBg: "#ff0000" },
  facebook: { icon: <FaFacebook size={18} />, defaultBg: "#1877f2" },
  linkedin: { icon: <FaLinkedin size={18} />, defaultBg: "#0a66c2" },
  email: { icon: <FaEnvelope size={18} />, defaultBg: "#ea4335" },
  whatsapp: { icon: <FaWhatsapp size={18} />, defaultBg: "#25d366" },
};

// ... আপনার ContactSection Component এর ভেতরে ...
const [socials, setSocials] = useState([]);

useEffect(() => {
  let isMounted = true;

  const fetchSocials = async (retries = 3) => {
    try {
      const res = await axios.get("https://arnab-backend.vercel.app/api/socials");
      if (isMounted) setSocials(res.data || []);
    } catch (err) {
      if (retries > 0) {
        setTimeout(() => fetchSocials(retries - 1), 1000);
      } else {
        console.error("Socials endpoint failed:", err);
        if (isMounted) setSocials([]);
      }
    }
  };

  fetchSocials();

  return () => { isMounted = false; };
}, []);



  return (
    <section className="w-full bg-white font-sans text-gray-800">
      {/* Top Banner with Overlay */}
      <div className="relative bg-[#6345ED] text-white pt-16 pb-36 px-6 md:px-16 overflow-hidden">
        {/* Background Overlay image or pattern */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600')` }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Reach Out to Us</h1>
            <p className="text-purple-100 text-lg max-w-md">
              Need support, have a query, or looking for collaboration? Let&apos;s talk!
            </p>
          </div>
        </div>
      </div>

      {/* Content Container (Card overlap effect) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-24 pb-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="pt-30 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Explore new destinations, indulge in local cuisines, and immerse yourself in diverse cultures.
              </p>
            </div>

            <div className="space-y-5 text-gray-700 font-medium text-sm">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gray-800" />
                <span>+8801613140291</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gray-800" />
                <span>retouchlab360@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-gray-800 flex-shrink-0" />
                <span>Satkhira 9400, Khulna, Bangladesh</span>
              </div>
            </div>

            {/* Social Icons */}

<div className="flex items-center gap-3 pt-2">
  {socials.map((item) => {
    const config = ICON_MAP[item.platform.toLowerCase()] || { icon: <FaGithub size={18} />, defaultBg: "#3e4856" };
    return (
      <a
        key={item._id}
        href={item.platform === "email" ? `mailto:${item.url}` : item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: item.bgColor || config.defaultBg }}
        className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-90 transition"
      >
        {config.icon}
      </a>
    );
  })}
</div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {status.msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6345ED] transition text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6345ED] transition text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6345ED] transition text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6345ED] transition text-sm text-gray-800 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6345ED] hover:bg-[#5235db] text-white font-medium py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="w-4 h-4 rotate-45 -mt-0.5" />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}