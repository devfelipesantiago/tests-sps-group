import authService from './authService';
const api = authService.api;

const userService = {
  list: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: 'An error occurred while fetching users',
        }
      );
    }
  },

  get: async (id) => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${id}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: 'An error occurred while fetching user',
        }
      );
    }
  },

  create: async (data) => {
    try {
      const response = await api.post(
        `${process.env.REACT_APP_SERVER_URL}/user/register`,
        data
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: 'An error occurred while creating user',
        }
      );
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`${process.env.REACT_APP_SERVER_URL}/user/delete/${id}`);
    } catch (error) {
      throw (
        error.response?.data || {
          message: 'An error occurred while deleting user',
        }
      );
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(
        `${process.env.REACT_APP_SERVER_URL}/user/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: 'An error occurred while updating user',
        }
      );
    }
  },
};

export default userService;
