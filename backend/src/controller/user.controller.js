const { userService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const addUser = async (req, res) => {
  const { status, data } = await userService.addUser(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateUser = async (req, res) => {
  const { body, params } = req;
  const { status, data } = await userService.updateUser(body, params.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const removeUser = async (req, res) => {
  const { status, data } = await userService.deleteUser(req.params.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const findAllUsers = async (req, res) => {
  const { status, data } = await userService.allUsers();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findUserById = async (req, res) => {
  const { status, data } = await userService.userById(req.params.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const login = async (req, res) => {
  try {
    const { status, data } = await userService.userLogin(
      req.body.email,
      req.body.password
    );
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addUser,
  updateUser,
  removeUser,
  findAllUsers,
  findUserById,
  login,
};
