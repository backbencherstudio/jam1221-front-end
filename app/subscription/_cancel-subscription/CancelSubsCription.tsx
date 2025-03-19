import React from 'react';

const CancelSubsCription: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to cancel?</h2>
        <p className="mb-6">If you confirm, you will automatically lose access to your account, all posts you shared, your saved pages, messages, etc.</p>
        <div className="flex space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, cancel</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">No, go back</button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubsCription;