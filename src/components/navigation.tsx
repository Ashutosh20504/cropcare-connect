
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Diagnose", href: "#diagnose" },
  { title: "AI Assistant", href: "#assistant" },
  { title: "Marketplace", href: "#marketplace" },
  { title: "About", href: "#about" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = scrollPosition > 20;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-2 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#home"
            className="text-xl md:text-2xl font-semibold tracking-tight"
          >
            <span className="text-cropcare-green-dark">Crop</span>
            <span className="text-cropcare-green">Care</span>
            <span className="text-cropcare-earth">Connect</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium smooth-transition hover:bg-cropcare-green-light text-foreground/80 hover:text-foreground"
            >
              {link.title}
            </a>
          ))}
          <a
            href="#login"
            className="ml-2 px-4 py-2 rounded-full bg-cropcare-green text-white text-sm font-medium shadow-sm smooth-transition hover:bg-cropcare-green-dark hover:shadow-md"
          >
            Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-cropcare-green-light smooth-transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="px-4 py-3 rounded-lg hover:bg-cropcare-green-light smooth-transition text-foreground/80 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              <a
                href="#login"
                className="mt-2 px-4 py-3 rounded-lg bg-cropcare-green text-white font-medium shadow-sm smooth-transition hover:bg-cropcare-green-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
