import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./layout-components/Navbar";
import Footer from "./layout-components/Footer";
import { CartProvider } from "./cart/cartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LuxeFashion | Premium Fashion & Modern Style",
  description:
    "LuxeFashion is a premium fashion destination offering modern, elegant, and trend-driven clothing designed for everyday luxury and timeless style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-img.png"
          fetchPriority="high"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <CartProvider>
            <Navbar />

            {children}

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </CartProvider>
        </Providers>

        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
