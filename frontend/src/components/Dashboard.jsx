import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ShareTaskModal from './ShareTaskModal';

const API_BASE_URL = 'http://localhost:8080/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error(error.message || 'An error occurred while fetching tasks.');
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }
      await fetchTasks();
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to add task.');
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update task');
      }
      await fetchTasks();
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update task.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }
      await fetchTasks();
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete task.');
    }
  };

  const shareTask = async (taskId, email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to share task');
      }
      toast.success('Task shared successfully!');
      await fetchTasks();
      setIsShareModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to share task.');
    }
  };

  const handleShareTask = (task) => {
    setSelectedTask(task);
    setIsShareModalOpen(true);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold">Collaborative To-Do App</h1>
            <button
              onClick={() => {
                logout();
                toast.info('Logged out successfully!');
              }}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <TaskForm onAddTask={addTask} />
        <div className="mt-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 p-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mt-6 bg-white shadow-sm rounded-md p-4">
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onShareTask={handleShareTask}
          />
        </div>
      </main>

      <ShareTaskModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={(email) => {
          if (selectedTask) {
            return shareTask(selectedTask._id, email).catch(() => {});
          }
        }}
      />
    </div>
  );
}

export default Dashboard;
