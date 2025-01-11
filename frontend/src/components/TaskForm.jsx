import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white shadow-md rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-700">Add New Task</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your task here..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
