"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/cartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PreviewCard({ product, onClose }) {
  const image = product?.thumbnail ?? product?.image ?? "/placeholder.jpg";

  const title =
    typeof product?.title === "string" ? product.title : "Untitled Product";

  const description =
    typeof product?.disc === "string" && product.disc.trim().length > 0
      ? product.disc
      : "Premium quality product";

  const rating = Number.isFinite(Number(product?.rating))
    ? Number(product.rating)
    : "4.0";

  const price = Number.isFinite(Number(product?.price))
    ? Math.floor(Number(product.price))
    : "999";

  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setSelectedSize(null);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!session) {
      toast.warning("Please login first to add items to cart", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1200);

      return;
    }
    addToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-4xl rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-96 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-3 mx-2 my-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-sm text-gray-600">{description}</p>

            <p className="text-sm">⭐ {rating} rating</p>
            <p className="text-2xl font-semibold my-4">₹{price}</p>

            <div className="space-y-2">
              <p className="text-sm font-medium">Select Size</p>

              <div className="flex gap-3 flex-wrap">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedSize || status === "loading"}
              onClick={handleAddToCart}
              className={`mt-4 px-6 py-3 rounded-xl transition
                ${
                  selectedSize
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {selectedSize ? "Add to Cart" : "Select a size"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
