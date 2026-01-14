"use client";

import {
  Share2,
  Camera,
  MessageCircle,
  Image as ImageIcon,
  ShieldCheck,
  Lock,
  Zap,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
     className="bg-linear-to-b from-[#1a1a1a] to-[#0f0f0f] text-gray-300 pt-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">

          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-yellow-400" />
              <h2 className="text-white text-xl font-semibold tracking-wide">
                LuxeFashion
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Discover timeless elegance and contemporary style with our curated
              collection of premium fashion pieces.
            </p>

            <div className="flex items-center gap-5 text-gray-400">
              <Share2 size={18} />
              <Camera size={18} />
              <MessageCircle size={18} />
              <ImageIcon size={18} />
            </div>
          </div>

          <FooterColumn
            title="SHOP"
            links={["New Arrivals", "Best Sellers", "Sale", "Collections"]}
          />

          <FooterColumn
            title="CUSTOMER SERVICE"
            links={["Contact Us", "Shipping Info", "Returns", "Size Guide"]}
          />

          <FooterColumn
            title="COMPANY"
            links={["About Us", "Careers", "Sustainability", "Press"]}
          />

          <FooterColumn
            title="LEGAL"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Accessibility",
            ]}
          />
        </div>

        <div className="border-t border-white/10 mt-20 pt-6 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            © 2026 LuxeFashion. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-yellow-400" />
              Secure Shopping
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-yellow-400" />
              SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterColumn = ({ title, links }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-white text-sm font-semibold tracking-widest">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {links.map((link, i) => (
          <li key={i} className="hover:text-white transition cursor-pointer">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};
