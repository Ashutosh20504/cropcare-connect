
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurCard } from "./ui/blur-card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Organic Fungicide Spray",
    description: "Effective against early blight and other fungal diseases",
    price: 24.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1674318012388-141651b08faa?q=80&w=1974&auto=format&fit=crop",
    tag: "Recommended",
  },
  {
    id: 2,
    name: "Plant Health Booster",
    description: "Strengthens plant immunity against diseases",
    price: 18.50,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=1932&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Copper-Based Treatment",
    description: "Traditional solution for blight and fungal issues",
    price: 15.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1575705315803-e30636cec4af?q=80&w=1974&auto=format&fit=crop",
  },
];

function ProductCard({ product }: { product: Product }) {
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
      transition={{ duration: 0.7 }}
    >
      <BlurCard className="h-full overflow-hidden" hoverEffect={true}>
        <div className="relative">
          {product.tag && (
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 bg-cropcare-green text-white text-xs font-medium rounded-full">
                {product.tag}
              </span>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              ({Math.floor(product.rating * 10)} reviews)
            </span>
          </div>
          <h3 className="font-semibold mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <button className="inline-flex items-center px-3 py-1.5 rounded-full bg-cropcare-green hover:bg-cropcare-green-dark text-white text-sm transition-colors">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </BlurCard>
    </motion.div>
  );
}

export function ProductsSection() {
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
    <section id="marketplace" className="py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recommended Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Shop for the best products to treat and prevent plant diseases, 
            based on our AI diagnosis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <BlurCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-cropcare-green-light p-3 rounded-full">
                <Check className="h-6 w-6 text-cropcare-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Product Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  All products are carefully selected and quality-verified
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                {
                  title: "Fast Delivery",
                  desc: "2-3 day shipping on all items",
                },
                {
                  title: "Expert Selection",
                  desc: "Products recommended by agricultural experts",
                },
                {
                  title: "Easy Returns",
                  desc: "30-day hassle-free return policy",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-cropcare-green mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <a
                href="#"
                className="text-sm font-medium text-cropcare-green hover:text-cropcare-green-dark inline-flex items-center"
              >
                Browse all products
                <svg
                  className="ml-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </BlurCard>
        </motion.div>
      </div>
    </section>
  );
}
