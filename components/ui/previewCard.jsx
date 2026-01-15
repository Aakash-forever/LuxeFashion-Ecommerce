"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PreviewCard({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);

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
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <div className="space-y-3 mx-2 text-2xl my-3">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-sm text-gray-600">{product.disc}</p>

            <p className="text-sm">⭐ {product.rating} rating</p>
            <p className="text-2xl font-semibold my-4">₹{product.price}</p>

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

            <button className="mt-4 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
