import {BASE_URL} from './BASE_URL'
const UserService = {
  
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

  
  getAllUsers: async () => {
    try {
      const response = await fetch(`${BASE_URL}users`, {
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

export default UserService;
