import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-brand text-brand">
              Littoral
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Bringing traditional South Indian flavors to your kitchen. Fresh, authentic, 
              and ready in minutes.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-background/70 hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faqs" className="text-background/70 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-background/70 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-background/70 hover:text-primary transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/70 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-background/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>123 Food Street, Chennai, Tamil Nadu 600001</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>hello@littoral.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-background/60">
          <p>© {currentYear} Littoral. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
