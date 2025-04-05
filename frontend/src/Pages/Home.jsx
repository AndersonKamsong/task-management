import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService'; // Assuming you have the TaskService ready

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', startDate: '' });
  const [statusUpdate, setStatusUpdate] = useState({ id: '', status: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTask();
      setTasks(response.tasks || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await TaskService.createTask(newTask);
      setNewTask({ name: '', startDate: '' });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await TaskService.updateStatusTask(statusUpdate.id, { status: statusUpdate.status });
      setStatusUpdate({ id: '', status: '' });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#f4d03f] p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>

      {/* Create Task */}
      <div className="mb-8 bg-[#292929] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          className="block w-full p-2 mb-4 bg-[#1e1e1e] border border-[#f4d03f] rounded-lg"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="date"
          className="block w-full p-2 mb-4 bg-[#1e1e1e] border border-[#f4d03f] rounded-lg"
          value={newTask.startDate}
          onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
        />
        <button
          className="bg-[#f4d03f] text-[#1e1e1e] px-4 py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
      </div>

      {/* Update Status */}
      <div className="mb-8 bg-[#292929] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Update Task Status</h2>
        {/* <input
          type="text"
          placeholder="Task ID"
          className="block w-full p-2 mb-4 bg-[#1e1e1e] border border-[#f4d03f] rounded-lg"
          value={statusUpdate.id}
          onChange={(e) => setStatusUpdate({ ...statusUpdate, id: e.target.value })}
        /> */}
        <select
          className="block w-full p-2 mb-4 bg-[#1e1e1e] border border-[#f4d03f] rounded-lg"
          value={statusUpdate.id}
          onChange={(e) => setStatusUpdate({ ...statusUpdate, id: e.target.value })}
        >
          <option value="">Select Status</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id} >{task.name}</option>
          ))}
        </select>
        <select
          className="block w-full p-2 mb-4 bg-[#1e1e1e] border border-[#f4d03f] rounded-lg"
          value={statusUpdate.status}
          onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="created">Created</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
          <option value="cancel">Cancel</option>
        </select>
        <button
          className="bg-[#f4d03f] text-[#1e1e1e] px-4 py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
          onClick={handleStatusUpdate}
        >
          Update Status
        </button>
      </div>

      {/* Task List */}
      <div className="bg-[#292929] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border border-[#f4d03f] p-4 rounded-xl">
              <h3 className="text-xl font-bold">{task.name}</h3>
              <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
