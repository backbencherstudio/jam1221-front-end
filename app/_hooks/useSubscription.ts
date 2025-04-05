import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/_components/AuthProviderContext';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user, loading: authLoading, isAuthenticated } = useAuth();

  const checkSubscription = useCallback(async () => {
    if (!isAuthenticated || !token || !user) {
      setIsSubscribed(false);
      setLoading(false);
      return;
    }

    // Admin always has access
    if (user.type === 'admin') {
      setIsSubscribed(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/subscription/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format');
      }

      // Check for both boolean and string status values
      const hasActiveSubscription = 
        data?.subscription?.status === true || 
        data?.subscription?.status === 'active' ||
        data?.subscription?.isActive === true;

      setIsSubscribed(hasActiveSubscription);
    } catch (error) {
      console.error('Subscription check failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to check subscription status');
      setIsSubscribed(false);
    } finally {
      setLoading(false);
    }
  }, [token, user, isAuthenticated]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (authLoading) return;

      if (!isAuthenticated || !token || !user) {
        if (mounted) {
          setIsSubscribed(false);
          setLoading(false);
        }
        return;
      }

      await checkSubscription();
    };

    init();

    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, token, user, checkSubscription]);

  return { 
    isSubscribed, 
    loading: loading || authLoading,
    error 
  };
};