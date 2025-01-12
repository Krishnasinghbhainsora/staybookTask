import React, { useState } from "react";

function TaskList({ tasks, onUpdateTask, onDeleteTask, onShareTask }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEditSave = () => {
    if (currentTask) {
      onUpdateTask(currentTask._id, { title: currentTask.title });
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id} className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center flex-grow">
                <input
                  type="checkbox"
                  checked={task.status === "Completed"}
                  onChange={() =>
                    onUpdateTask(task._id, {
                      status: task.status === "Completed" ? "Pending" : "Completed",
                    })
                  }
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <div className="ml-3 flex-grow">
                  <p
                    className={`text-sm font-medium text-gray-900 ${
                      task.status === "Completed" ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">{task.owner.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => {
                    setCurrentTask(task);
                    setIsEditModalOpen(true);
                  }}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => onShareTask(task)}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Share
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={currentTask?.title || ""}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;

