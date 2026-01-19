import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import LogoutButton from "./logout-button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full mb-4"
            />
          )}

          <h2 className="text-xl font-semibold">{session.user.name}</h2>
          <p className="text-gray-500 text-sm">{session.user.email}</p>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
            View Orders
          </button>

          <button className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
            Account Settings
          </button>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}