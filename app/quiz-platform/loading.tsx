
export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="flex px-3 py-2 bg-blue-600 rounded-md text-white font-medium justify-center gap-2.5 mt-10">
    <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
    Loading...
  </div>
  }