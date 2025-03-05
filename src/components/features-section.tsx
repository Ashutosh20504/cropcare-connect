
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Leaf, MessageSquare, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurCard } from "./ui/blur-card";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const features = [
  {
    title: "AI Disease Detection",
    description:
      "Upload images of your plants and our AI will instantly identify diseases with high accuracy",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Expert Guidance",
    description:
      "Receive tailored advice on treatment, prevention, and best practices for your crops",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Integrated Marketplace",
    description:
      "Shop for recommended products directly through our platform and get them delivered",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
];

function Feature({ title, description, icon, index }: FeatureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.7 }}
    >
      <BlurCard
        className="h-full p-6 flex flex-col"
        hoverEffect={true}
      >
        <div
          className={cn(
            "rounded-full p-2.5 mb-4 w-12 h-12 flex items-center justify-center",
            "bg-cropcare-green-light text-cropcare-green"
          )}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </BlurCard>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-cropcare-green-light/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            ref={ref}
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            All-in-One Solution for Crop Health
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            CropCare Connect combines advanced AI technology with agricultural
            expertise to help you identify, treat, and prevent plant diseases.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16">
          <BlurCard className="p-6 sm:p-8 mx-auto max-w-3xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-cropcare-green text-white p-1.5 rounded-full mr-3">
                <Check className="h-4 w-4" />
              </span>
              Why Farmers Choose CropCare Connect
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Early detection prevents crop losses",
                "Real-time expert guidance",
                "Integrated solutions marketplace",
                "Easy to use, even with limited tech skills",
                "Works offline in areas with poor connectivity",
                "Continuously improving AI accuracy",
              ].map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start"
                >
                  <span className="mr-2 mt-1 text-cropcare-green">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </BlurCard>
        </div>
      </div>
    </section>
  );
}
