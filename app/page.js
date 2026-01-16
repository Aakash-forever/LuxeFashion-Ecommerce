"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import ProductCard from "@/components/ui/productCard";
import ReviewsCard from "@/components/ui/reviewsCard";
import PreviewCard from "@/components/ui/previewCard";
import Link from "next/link";

const LayoutTextFlip = dynamic(
  () => import("@/components/ui/layout-text-flip.client"),
  { ssr: false }
);

export default function Home() {
  const bgRef = useRef(null);
  const sliderRef = useRef(null);
  const speedRef = useRef(100);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    });

    let rafId;
    let scrollY = 0;

    lenis.on("scroll", ({ scroll }) => {
      scrollY = scroll;
    });

    lenis.raf(0);

    const raf = (time) => {
      lenis.raf(time);

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      }

      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let lastTime = null;
    let direction = 1;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    observer.observe(slider);

    speedRef.current = 50;

    const animate = (time) => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTime) lastTime = time;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      slider.scrollLeft += direction * speedRef.current * deltaTime;

      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll) direction = -1;
      if (slider.scrollLeft <= 0) direction = 1;

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      speedRef.current = 0;
    };

    const handleMouseLeave = () => {
      speedRef.current = 50;
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const TrendingProducts = [
    {
      id: 1,
      title: "Men's Street Shirt",
      image: "/mens-trending.jpg",
      price: "1299",
      rating: "4.5",
      sizes: ["S", "M", "L", "XL"],
      disc: "Relaxed fit streetwear shirt with premium cotton fabric.",
    },
    {
      id: 2,
      title: "Women's Summer Dress",
      image: "/womens-trending.webp",
      price: "2199",
      rating: "4.6",
      sizes: ["S", "M", "L", "XL"],

      disc: "Lightweight floral dress perfect for summer outings.",
    },
    {
      id: 3,
      title: "Luxury Watch",
      image: "/watch-trending.jpg",
      price: "4999",
      rating: "4.8",
      sizes: ["S", "M", "L", "XL"],

      disc: "Elegant luxury watch with stainless steel strap.",
    },
    {
      id: 4,
      title: "Premium Sunglasses",
      image: "/glasses-trending.jpg",
      price: "1599",
      rating: "4.4",
      sizes: ["S", "M", "L", "XL"],

      disc: "UV-protected premium sunglasses with modern design.",
    },
    {
      id: 5,
      title: "Men's Oversized T-shirt",
      image: "/tshirt-trending.jpg",
      price: "2499",
      rating: "4.7",
      sizes: ["S", "M", "L", "XL"],

      disc: "Trendy oversized t-shirt with soft fleece interior.",
    },
    {
      id: 6,
      title: "Women's Casual Sneakers",
      image: "/sneakers-trending.jpg",
      price: "3199",
      rating: "4.6",
      sizes: ["S", "M", "L", "XL"],

      disc: "Comfortable everyday sneakers with breathable design.",
    },
  ];
  const FeaturedCollection = [
    {
      title: "Casual Wears",
      img: "/casual-wear2-img.jpg",
      desc: "Everyday comfort with effortless street style",
      items: "24 items",
    },
    {
      title: "Premium Watches",
      img: "/watch-img.jpg",
      desc: "Precision-crafted timepieces for timeless elegance",
      items: "18 items",
    },
    {
      title: "Men's Collection",
      img: "/mens-collection-img.jpg",
      desc: "Refined styles built for confidence and power",
      items: "32 items",
    },
    {
      title: "Women's Collection",
      img: "/womens-collection-img.jpg",
      desc: "Graceful silhouettes with a contemporary edge",
      items: "29 items",
    },
  ];

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 -z-20 bg-[url('/hero-img.png')] bg-cover bg-top-right will-change-transform transform-gpu"
        />

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

        <div className="flex flex-col h-full justify-center max-w-4xl mx-10  gap-2 text-[#4A3728] font-semibold">
          <p className="inline-flex max-w-42 items-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs tracking-wide backdrop-blur-md">
            NEW COLLECTION 2026
          </p>

          <h1 className="text-7xl leading-[1.05] font-bold tracking-tight text-[#4A3728] my-2 flex items-center">
            DESIGNED FOR
            <LayoutTextFlip />
          </h1>

          <p className="my-3 text-xl">
            More than clothing — it’s a statement of confidence, culture, and
            individuality.
          </p>

          <Link href={"/shop"}>
            <button className="group relative overflow-hidden rounded-xl bg-[#d4af37] px-7 py-4 mt-5 text-black font-semibold shadow-lg w-fit">
              <span className="relative z-10 flex items-center gap-3">
                Shop Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                  className="transition-transform group-hover:translate-x-1.5 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12L13.5 19.5M21 12H3"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </Link>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width={35}
              height={35}
              className="animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v14m0 0l-5-5m5 5l5-5"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white p-25">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold">Featured Collections</h2>
          <p className="my-3 text-lg text-gray-700">
            Explore our carefully curated collections designed for every
            occasion and style preference.
          </p>
        </div>

        <div className="flex justify-evenly my-10 gap-8">
          {FeaturedCollection.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden flex flex-col justify-end px-2 py-3 w-75 h-85 rounded-3xl text-white"
            >
              <div
                className="w-75 h-85 absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold  rounded-xl">
                  {item.title}
                </h3>
                <p>{item.desc}</p>
                <span className="text-gray-300">{item.items}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen px-20 py-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-bold">Trending Now</h2>
          <p className="my-3 text-lg text-gray-700">
            Discover our most popular pieces loved by fashion enthusiasts
            worldwide.
          </p>
        </div>

        <div
          ref={sliderRef}
          className="mt-10 flex flex-nowrap gap-10 overflow-x-scroll no-scrollbar"
        >
          {TrendingProducts.map((product) => (
            <div
              key={product.id}
              className=" min-w-75 min-h-90 py-5 transition-transform duration-300 hover:scale-105"
            >
              <ProductCard product={product} onClick={setSelectedProduct} />
            </div>
          ))}
        </div>
        <PreviewCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </section>

      <section className="min-h-screen p-10 font-['Source Sans 3']">
        <div className="flex flex-col justify-center items-center my-20">
          <h2 className="text-5xl font-bold">What Our Customers Say</h2>
          <p className="my-3 text-lg text-gray-700">
            Join thousands of satisfied customers who trust LuxeFashion for
            their premium fashion needs.
          </p>
        </div>
        <div className="flex justify-center items-center mx-30 my-10 w-300 h-60 gap-10">
          {[
            {
              profilePic:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9",
              name: "Arjun Patel",
              occupation: "Regular Customer",
              rating: 4.5,
              comment:
                "Quality is really good for the price. Fabric feels premium and fitting is perfect.",
            },
            {
              profilePic:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
              name: "Neha Sharma",
              occupation: "First-time Buyer",
              rating: 4.0,
              comment:
                "Product looks exactly like the images. Delivery was fast and packaging was neat.",
            },
            {
              profilePic:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
              name: "Rohit Kumar",
              occupation: "Frequent Shopper",
              rating: 3.8,
              comment:
                "Overall good, but the size runs slightly small. Go one size up.",
            },
            {
              profilePic:
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
              name: "Pooja Verma",
              occupation: "Fashion Enthusiast",
              rating: 4.7,
              comment: "Loved the design and comfort. Totally worth the money!",
            },
          ].map((review, i) => (
            <ReviewsCard key={i} {...review} />
          ))}
        </div>
      </section>
    </>
  );
}
