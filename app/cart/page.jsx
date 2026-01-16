"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cartContext";
import { toast } from "react-toastify";

export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    toast.success("🎉 Order placed successfully!");

    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white p-12 rounded-3xl shadow-lg text-center max-w-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-gray-400 mb-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75"
            />
          </svg>

          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>

          <p className="text-gray-600 mb-6">
            Looks like you haven’t added anything yet.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-10 py-20">
      <h1 className="text-5xl font-bold mb-12">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white p-5 rounded-2xl shadow-lg"
            >
              <div className="relative w-28 h-32 shrink-0">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-sm text-gray-500">Size: {item.size}</p>

                <p className="font-bold">₹{Math.floor(item.price)}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.size)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="px-4">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id, item.size)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-sm font-semibold text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>₹99</span>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total</span>
            <span>₹{subtotal + 99}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
