import React, { useState } from "react";

function ShareTaskModal({ isOpen, onClose, onShare }) {
  const [email, setEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSharing(true);
      setError("");
      try {
        await onShare(email.trim());
        setEmail("");
        onClose();
      } catch (error) {
        setError(error.message || "Failed to share task. Please try again.");
      } finally {
        setIsSharing(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3
            id="modal-title"
            className="text-lg font-medium text-gray-900 mb-4"
          >
            Share Task
          </h3>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSharing}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSharing}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                {isSharing ? "Sharing..." : "Share"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShareTaskModal;
