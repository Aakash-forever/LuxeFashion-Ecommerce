"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../cart/cartContext";
import AuthSection from "@/components/ui/authSection";

const Navbar = () => {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white text-black shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <svg
            width="140"
            height="32"
            viewBox="0 0 140 32"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto"
          >
            <rect
              x="8"
              y="4"
              width="16"
              height="20"
              className="fill-[#d4af37]"
            />
            <rect x="12" y="8" width="8" height="12" className="fill-black" />
            <text
              x="32"
              y="20"
              fontFamily="Playfair Display"
              fontSize="18"
              fontWeight="600"
              className="fill-gray-800"
            >
              LuxeFashion
            </text>
          </svg>
        </div>

        <div className="hidden md:flex gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-[#b8962e]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="18"
              height="18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            href="/shop"
            className="flex items-center gap-2 hover:text-[#b8962e]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="18"
              height="18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>Shop</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="20"
            height="20"
            className="hover:text-[#b8962e]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <Link href="/cart">
            <div className="relative hover:text-[#b8962e]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="22"
                height="22"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black px-1 rounded-full text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
         
          <AuthSection />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
