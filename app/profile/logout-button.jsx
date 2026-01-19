"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
    >
      Logout
    </button>
  );
}
