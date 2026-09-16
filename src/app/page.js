import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
   <main className="scroll-smooth" id="top">
      <Navbar />
      
      <Hero />

      {/* scroll-mt-20 যুক্ত করা হয়েছে নেভবারের ৮px ফাঁকা রাখার জন্য */}
      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="services" className="scroll-mt-20">
        <ServicesSection />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      <WhatsAppIcon />
    </main>
  );
}
