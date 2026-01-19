"use client";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome to LuxeFashion</h1>
        <p className="text-gray-500 mb-6">
          Sign in to continue shopping premium fashion
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 hover:bg-gray-900"
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={25}
            height={25}
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
