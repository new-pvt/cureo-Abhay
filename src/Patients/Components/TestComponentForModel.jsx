import React, { useState } from 'react'

const TestComponentForModel = () => {
    const [showModal, setShowModal] = useState(true);
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sign In</h2>
              <p>Please sign in to continue.</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  export default TestComponentForModel