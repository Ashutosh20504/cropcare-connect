
import { useEffect } from "react";
import { ChatbotSection } from "@/components/chatbot-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { ProductsSection } from "@/components/products-section";
import { UploadSection } from "@/components/upload-section";

// Import and set up framer-motion
import { AnimatePresence, motion } from "framer-motion";

// Add framer-motion as a dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  useEffect(() => {
    // Scroll reveal animation
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal-on-scroll");
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          reveal.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col w-full"
      >
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <UploadSection />
          <ChatbotSection />
          <ProductsSection />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
