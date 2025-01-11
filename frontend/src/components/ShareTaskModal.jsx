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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4">
          <h3
            id="modal-title"
            className="text-lg font-medium text-gray-800 mb-4"
          >
            Share Task
          </h3>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSharing}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSharing}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
