
import { motion } from "framer-motion";
import { ArrowDownIcon, LeafIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BlurCard } from "./ui/blur-card";

export function HeroSection() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const staggerDelay = 0.2;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-cropcare-green/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cropcare-earth/10 rounded-full filter blur-3xl" />
      </div>

      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Hero Content */}
        <div className="order-2 lg:order-1">
          <div className="space-y-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: staggerDelay * 0, duration: 0.7 }}
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-cropcare-green-light text-cropcare-green-dark">
                <LeafIcon className="mr-1 h-3.5 w-3.5" />
                AI-Powered Farming Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: staggerDelay * 1, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Smart Crop Diagnostics at Your Fingertips
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: staggerDelay * 2, duration: 0.7 }}
              className="text-lg text-muted-foreground"
            >
              Detect diseases, get expert advice, and find solutions for your
              crops—all in one place, powered by advanced AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: staggerDelay * 3, duration: 0.7 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#diagnose"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-cropcare-green hover:bg-cropcare-green-dark text-white font-medium shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Start Diagnosis
              </a>
              <a
                href="#assistant"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-cropcare-earth-light hover:bg-cropcare-earth/30 text-cropcare-earth-dark font-medium transition-all duration-300"
              >
                Talk to AI Assistant
              </a>
            </motion.div>
          </div>
        </div>

        {/* Hero Graphics */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hasLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: staggerDelay * 2, duration: 0.8 }}
        >
          <BlurCard className="relative p-2 lg:p-3 max-w-sm w-full">
            <img
              src="https://images.unsplash.com/photo-1627920769297-e5c9df5b0d97?q=80&w=774&auto=format&fit=crop"
              alt="AI plant diagnosis demonstration"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              loading="eager"
            />
            <div className="absolute bottom-5 left-5 right-5">
              <BlurCard className="p-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-cropcare-green text-white rounded-full p-2 flex-shrink-0">
                    <LeafIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Diagnosis Complete</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Early Blight detected on Tomato leaves. Check recommended treatments.
                    </p>
                  </div>
                </div>
              </BlurCard>
            </div>
          </BlurCard>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <ArrowDownIcon className="h-5 w-5 text-cropcare-green" />
      </div>
    </section>
  );
}
