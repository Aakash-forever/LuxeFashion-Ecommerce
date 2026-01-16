"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/cartContext";

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

  useEffect(() => {
    setSelectedSize(null);
  }, [product]);

  if (!product) return null;
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
            {image && (
              <Image
                src={image}
                alt={product.title}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>

          <div className="space-y-3 mx-2 text-2xl my-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-sm text-gray-600">{description}</p>

            <p className="text-sm">⭐ {rating} rating</p>
            <p className="text-2xl font-semibold my-4">₹{price}</p>

            <div className="space-y-2">
              <p>Select Size</p>

              <div className="flex gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium
          ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-black"
          }
        `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedSize}
              onClick={() => {
                addToCart(product, selectedSize);
                onClose();
              }}
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
