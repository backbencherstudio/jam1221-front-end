"use client"

import { useState } from 'react';
// Adjust import path based on your project structure
import { AlertTriangle, Check, Clock, Calendar, CreditCard, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../_components/AuthProviderContext';
import { redirect } from "next/navigation"

export interface Subscription {
  stripe_subscription_id: string;  // Note: Corrected from "strlpe_subscription_id" in your image
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  plan_type: string;
  current_period_end: string; // ISO 8601 date string
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  subscriptions?: Subscription[];
}

export default function SubscriptionStatusPage() {
 const { user, loading,token} = useAuth() as {
    user: User | null;
    loading: boolean;
    token:any;
    // Add other return values from useAuth as needed
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);



  const handleCancelSubscription = async () => {
    if (!user?.subscriptions?.[0]?.stripe_subscription_id) return;
    
    const subscriptionId = user.subscriptions[0].stripe_subscription_id;
  
    setIsLoading(true);
    setCancelError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/cancel-subscription/${subscriptionId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json()

      if(data.success){
        redirect("/")
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to cancel subscription');
      }
      
      setCancelSuccess(true);
      setIsModalOpen(false);
      
      // Your auth context might have a refresh method you can call here
      // Example: refreshUserData();
    } catch (err) {
      console.error('Failed to cancel subscription:', err);
      setCancelError(err instanceof Error ? err.message : 'Failed to cancel subscription. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'past_due': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <Check className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      case 'past_due': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const subscription = user?.subscriptions?.[0];
  const isActive = subscription?.status === 'active';



  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-md px-3 bg-blue-500 text-white text-lg font-bold py-2">
          <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700">Please log in to view your subscription information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success notification */}
        {cancelSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Subscription cancelled successfully</h3>
              <p className="mt-1 text-sm text-green-700">
                Your subscription has been cancelled. You will have access to premium features until the end of your current billing period.
              </p>
              <button 
                onClick={() => setCancelSuccess(false)} 
                className="mt-2 text-sm text-green-800 hover:text-green-600 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Subscription Management</h1>
            <p className="mt-1 text-sm text-gray-500">View and manage your subscription details</p>
          </div>
          
          {/* Content */}
          <div className="px-6 py-5">
            {/* User Info */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500">Account Information</h2>
              <p className="mt-1 text-base font-medium text-gray-900">{user.email}</p>
              <p className="text-sm text-gray-500">Member since {formatDate(user.created_at)}</p>
            </div>

            {/* Subscription Details */}
            {user.subscriptions && user.subscriptions.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">Current Subscription</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.subscriptions?.[0].status)}`}>
                      {getStatusIcon(user.subscriptions?.[0].status)}
                      <span className="ml-1 capitalize">{user.subscriptions?.[0].status}</span>
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Plan</h4>
                      <p className="text-sm text-gray-500 capitalize">{user.subscriptions?.[0].plan_type}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Current Period End</h4>
                      <p className="text-sm text-gray-500">{formatDate(user.subscriptions?.[0].current_period_end)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Subscription ID</h4>
                      <p className="text-sm text-gray-500">{user.subscriptions?.[0].stripe_subscription_id}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t">
                  <button
                    onClick={() => isActive && setIsModalOpen(true)}
                    disabled={!isActive}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                      ${isActive 
                        ? 'text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500' 
                        : 'text-gray-400 bg-gray-100 cursor-not-allowed'}`}
                  >
                    {isActive ? 'Cancel Subscription' : 'Subscription Cancelled'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-gray-50">
                <p className="text-gray-500">No active subscriptions found.</p>
                <a 
                  href="/subscription" 
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Available Plans
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Subscription</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.
                      </p>
                      {cancelError && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                          {cancelError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Yes, Cancel'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  No, Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}