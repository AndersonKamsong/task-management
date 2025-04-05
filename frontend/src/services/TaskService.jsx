import { BASE_URL } from './BASE_URL.jsx'
const TaskService = {

    updateStatusTask: async (id, taskData) => {
        try {
            const response = await fetch(`${BASE_URL}task/status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
    updateTask: async (id, taskData) => {
        try {
            const response = await fetch(`${BASE_URL}task/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
    deleteTask: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}task/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
    createTask: async (taskData) => {
        try {
            const response = await fetch(`${BASE_URL}task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
    getAllTask: async () => {
        try {
            const response = await fetch(`${BASE_URL}task`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch users');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
    getAllUserTask: async () => {
        try {
            const response = await fetch(`${BASE_URL}task/user`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch users');
            }

            return await response.json();
        } catch (error) {
            throw error.message;
        }
    },
};

export default TaskService;
