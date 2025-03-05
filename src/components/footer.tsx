
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-cropcare-green-light/20">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-semibold tracking-tight inline-block mb-4">
              <span className="text-cropcare-green-dark">Crop</span>
              <span className="text-cropcare-green">Care</span>
              <span className="text-cropcare-earth">Connect</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              Combining AI technology with agricultural expertise to help farmers
              identify, treat, and prevent plant diseases.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "#" },
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Instagram className="h-5 w-5" />, href: "#" },
                { icon: <Linkedin className="h-5 w-5" />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 rounded-full bg-white/80 text-foreground/80 hover:text-cropcare-green hover:bg-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Disease Detection", href: "#diagnose" },
                { name: "AI Assistant", href: "#assistant" },
                { name: "Marketplace", href: "#marketplace" },
                { name: "About Us", href: "#about" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Crop Disease Library", href: "#" },
                { name: "Farming Guides", href: "#" },
                { name: "Research Papers", href: "#" },
                { name: "API Documentation", href: "#" },
                { name: "Contact Support", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} CropCare Connect. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
