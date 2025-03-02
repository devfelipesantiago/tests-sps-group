const route = require('express').Router();
const { userController } = require('../controller');
const validateJWT = require('../auth/validateJWT');

route.post('/user/register', userController.addUser);
route.put('/user/update/:id', validateJWT, userController.updateUser);
route.delete('/user/delete/:id', validateJWT, userController.removeUser);
route.get('/users', validateJWT, userController.findAllUsers);
route.get('/user/:id', validateJWT, userController.findUserById);
route.post('/login', userController.login);
module.exports = route;
