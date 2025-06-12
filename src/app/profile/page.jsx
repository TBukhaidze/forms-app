"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="text-lg">{session.user.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Account Status
            </h3>
            <p className="text-lg">
              {session.user.isBlocked ? "Blocked" : "Active"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Role</h3>
            <p className="text-lg capitalize">
              {session.user.role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
