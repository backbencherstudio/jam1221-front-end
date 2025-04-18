
"use client"

import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from "../_components/AuthProviderContext";

interface PricingTierProps {
  title: string;
  description: string;
  price: number;
  iconType: 'starter' | 'professional';
  isPopular?: boolean;
  validity: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  title,
  price,
  iconType,
  isPopular = false,
  validity,
}) => {
  const router = useRouter();
  const { token } = useAuth();
  // const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (plan: string) => {
    // setIsProcessing(true);
    // const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/subscribe?plan=${plan === "month" ? "starter" : "pro"}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.redirected) {
        router.push(response.url);
        return;
      }

      const data = await response.json();
      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      // setIsProcessing(false);
    }
  };

  return (
    <div className={`w-full p-6 rounded-lg ${isPopular ? 'bg-teal-800' : 'bg-teal-800/20'}`}>
      <div className="w-36 h-36 bg-gray-100 rounded-lg p-6 mb-4">
        {iconType === 'starter' ? (
          <div className="flex flex-col h-full">
            <div className="flex h-1/2">
              <div className="w-1/2">
                <div className="flex flex-col-reverse h-full">
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
            <div className="flex h-1/2">
              <div className="w-1/2 bg-teal-500"></div>
              <div className="w-1/2 rounded-tl-full bg-teal-500"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex h-1/2">
              <div className="w-1/2">
                <div className="flex flex-col-reverse h-full">
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                </div>
              </div>
              <div className="w-1/2 flex items-start justify-end">
                <div className="w-4 h-4 rounded-full bg-teal-500"></div>
              </div>
            </div>
            <div className="flex h-1/2">
              <div className="w-1/2 bg-teal-500"></div>
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 rounded-tl-full bg-teal-500"></div>
                <div className="h-1/2 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

      <div className="flex items-baseline mb-8">
        <span className="text-5xl font-bold text-white">
          ${price}
        </span>
        <span className="ml-2 text-white">
          per / <span className='text-2xl font-bold'>{validity}</span>
        </span>
      </div>

      <button onClick={() => handleSubscribe(validity)} className="w-full bg-teal-700 text-white rounded py-3 px-4 hover:bg-teal-600 transition">
        Subscribe
      </button>
    </div>
  );
};

const PricingPage: NextPage = () => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);




  useEffect(() => {
    // setIsClient(true);
    loadingSpinner()
    const checkSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/subscription/status`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setIsSubscribed(data?.subscription?.status || false);

        if (data.isSubscribed || user?.type === "admin") {
          router.push('/about');
          return;
        }

        // setIsLoading(false);
      } catch (error) {
        console.error('Error checking subscription:', error);
        // setIsLoading(false);
      }
    };

    checkSubscription();
  }, [router, user]);

  // Only render content after client-side hydration
  // if (!isClient) return null;

  function loadingSpinner() {
    if (loading || user === undefined) {
      return (
        <div className="min-h-screen bg-teal-500 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    } 
  }

  const isBasicUser = user?.type === "admin" || isSubscribed;


  return (

    <>
      {(loading || isBasicUser || user?.type === undefined)   ? (
        <div className="min-h-screen bg-teal-500 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-teal-500 ">
          <div className='flex w-full justify-center p-4'>
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center">
              <div className='w-full'>
                <PricingTier
                  title="Starter"
                  description="Start with the basics - everything you need to get up and running with one project."
                  price={99}
                  iconType="starter"
                  validity="month"
                />
              </div>

              <div className="relative w-full">
                <PricingTier
                  title="Professional"
                  description="Get all the starter benefits whilst enjoying the freedom to create unlimited team projects."
                  price={299}
                  iconType="professional"
                  isPopular={true}
                  validity="year"

                />
                <div className="absolute top-2 right-2 bg-white text-teal-800 text-xs px-2 py-1 rounded">
                  Most popular
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className='px-4 rounded-md md:text-2xl text-lg scale-100 hover:scale-105 duration-200 font-medium text-white py-2 mt-4 bg-amber-500/90 block'>
              <Link href="/">
                Continue without Subscription
              </Link>
            </button>
          </div>
        </div>)}
    </>
  );
};

export default PricingPage;