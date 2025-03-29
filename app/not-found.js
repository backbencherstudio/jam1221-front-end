"use client"

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>404 Not Found | Page Missing</title>
        <meta name="description" content="The page you are looking for does not exist or has been moved." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="text-center">
            <div className="text-7xl font-bold text-red-500 mb-4">404</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
            
            <p className="text-gray-600 mb-6">
              We could not find the page at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm break-all">{router.asPath}</code>
            </p>
            
            <div className="text-left text-gray-600 mb-8">
              <p className="mb-2">This might be because:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The page has been moved or deleted</li>
                <li>There was a typo in the URL</li>
                <li>You do not have access to this page</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link 
                href="/" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition-colors"
              >
                Return to Homepage
              </Link>
              
              <button 
                onClick={() => router.back()} 
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 font-medium rounded-md transition-colors"
              >
                Go Back
              </button>
            </div>
            
            <p className="text-gray-500">
              Still can not find what you are looking for?{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}