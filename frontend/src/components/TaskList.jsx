import React, { useState } from "react";

function TaskList({ tasks, onUpdateTask, onDeleteTask, onShareTask }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (currentTask) {
      onUpdateTask(currentTask._id, { title: currentTask.title });
      setIsEditModalOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id} className="py-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() =>
                  onUpdateTask(task._id, {
                    status: task.status === "Completed" ? "Pending" : "Completed",
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium text-gray-900 truncate ${
                    task.status === "Completed" ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-500 truncate">{task.owner.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => onShareTask(task)}
                  className="p-2 rounded-full hover:bg-gray-100"
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
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={currentTask?.title || ""}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, title: e.target.value }))
              }
              onKeyDown={handleKeyDown} // Trigger save on "Enter"
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
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
