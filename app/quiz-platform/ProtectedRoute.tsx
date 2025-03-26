"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/AuthProviderContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, loading, token } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }

    const checkSubscription = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/payment/subscription/status", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setIsSubscribed(data?.subscription?.status || false);
      } catch (error) {
        console.error("Subscription check failed", error);
        setIsSubscribed(false);
      }
    };

    if (!loading && isAuthenticated) {
      checkSubscription();
    }
  }, [loading, isAuthenticated, token, router]);

  if (loading || isSubscribed === null) {
    return (
      <div className="flex px-3 py-2 bg-blue-600 rounded-md text-white font-medium justify-center gap-2.5 mt-10">
        <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
        Loading...
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-center text-red-500 text-2xl font-medium">
          Access requires an active subscription. Please subscribe to continue.
        </p>
        <a
          href="/subscription"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Upgrade Subscription
        </a>
      </div>
    );
  }
console.log(isSubscribed)
  return <>{children}</>;
};

export default ProtectedRoute;
