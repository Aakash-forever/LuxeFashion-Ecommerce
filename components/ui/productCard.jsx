"use client";

import Image from "next/image";

function ProductCard({ product }) {
  const imageSrc =
    product?.thumbnail ??
    product?.image ??
    "/placeholder.jpg";

  const title =
    typeof product?.title === "string"
      ? product.title
      : "Untitled Product";

  const description =
    typeof product?.disc === "string" && product.disc.trim().length > 0
      ? product.disc
      : "Premium quality product";

  const rating = Number.isFinite(Number(product?.rating))
    ? Number(product.rating).toFixed(1)
    : "4.0";

  const price = Number.isFinite(Number(product?.price))
    ? Number(product.price).toLocaleString("en-IN")
    : "999";

  return (
    <div
      className="w-72 rounded-2xl bg-slate-50 overflow-hidden
      shadow-[0_10px_30px_rgba(0,0,0,0.14)]
      hover:shadow-[0_18px_50px_rgba(0,0,0,0.22)]
      transition-shadow duration-300"
    >
      <div className="relative w-full h-[240px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="288px"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          ★★★★☆
          <span className="ml-2 text-gray-500">
            {rating}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-gray-900">
            ₹{price}
          </span>

          <button
            type="button"
            className="rounded-lg bg-black px-3 py-1.5
            text-sm text-white hover:bg-gray-800 transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
