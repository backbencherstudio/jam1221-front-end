import { useState, useEffect } from 'react';
import { useAuth } from '@/app/_components/AuthProviderContext';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token, user, loading: authLoading } = useAuth();

  useEffect(() => {
    let isActive = true;

    const checkSubscription = async () => {
      if (authLoading || !token) {
        setLoading(false);
        return;
      }

      if (user?.type === 'admin') {
        if (isActive) {
          setIsSubscribed(true);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/subscription/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Subscription check failed');
        }

        const data = await response.json();
        if (isActive) {
          setIsSubscribed(data?.subscription?.status || false);
        }
      } catch (error) {
        console.error('Subscription check failed:', error);
        if (isActive) {
          setIsSubscribed(false);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    checkSubscription();

    return () => {
      isActive = false;
    };
  }, [token, user, authLoading]);

  return { isSubscribed, loading };
};