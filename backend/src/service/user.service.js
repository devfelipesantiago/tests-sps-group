const { userModel } = require('../model');
const jwt = require('jsonwebtoken');

const secret = '';

const addUser = async (data) => {
  const exist = await userModel.findByEmail(data.email, data.password);
  if (exist)
    return { status: 'CONFLICT', data: { message: 'User already exist!' } };

  const user = await userModel.insert(data);
  return { status: 'SUCCESSFUL', data: user };
};

const updateUser = async (data, id) => {
  const exist = await userModel.findById(id);

  if (!exist)
    return { status: 'NOT_FOUND', data: { message: 'User not found!' } };

  const user = await userModel.update(data, id);
  return { status: 'SUCCESSFUL', data: { message: 'User updated!' } };
};

const deleteUser = async (id) => {
  const exist = await userModel.findById(id);
  if (!exist)
    return { status: 'NOT_FOUND', data: { message: 'User not found!' } };

  await userModel.remove(id);
  return { status: 'SUCCESSFUL', data: { message: 'User deleted!' } };
};

const allUsers = async () => {
  const users = await userModel.findAll();
  return { status: 'SUCCESSFUL', data: users };
};

const userById = async (id) => {
  const user = await userModel.findById(id);
  if (!user)
    return { status: 'NOT_FOUND', data: { message: 'User not found!' } };

  return { status: 'SUCCESSFUL', data: user };
};

const userByEmail = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return {
      status: 'NOT_FOUND',
      data: { message: 'User not found or password is incorrect!' },
    };

  return { status: 'SUCCESSFUL', data: user };
};

const userLogin = async (email, password) => {
  if (!email || !password)
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Email and password required!' },
    };

  const user = await userModel.findByEmail(email);

  if (!user || user.password !== password)
    return {
      status: 'NOT_FOUND',
      data: { message: 'User not found or password is incorrect!' },
    };

  const jwtConfig = {
    expiresIn: '1h',
  };

  //const token = jwt.sign({ email, password }, secret, jwtConfig);
  const token = { email, password };
  return { status: 'SUCCESSFUL', data: token };
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  allUsers,
  userById,
  userByEmail,
  userLogin,
};
