"use client";

import { useAuth } from '@/app/_components/AuthProviderContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../loading'; // Your loading component

const HumanQuestionPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Question About Human</h1>
    </div>
  );
};

export default HumanQuestionPage;
