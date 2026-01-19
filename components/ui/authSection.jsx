"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function AuthSection() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 font-semibold py-2 rounded-xl bg-[#d4af37] text-black hover:bg-[#b8962e]"
      >
        Log in
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <Image
          src={session.user.image}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />

      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm rounded-t-xl hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm rounded-b-xl text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
