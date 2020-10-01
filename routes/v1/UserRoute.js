const express = require('express');
const routes = express.Router();
const UserController = require('./../../controllers/v1/UserController');
const AuthMiddeware = require('../../middleware/VerifyTokenMiddleware');
const RoleMiddeware = require('../../middleware/RoleMiddleware');

const user = new UserController();
const verify = new AuthMiddeware();
const role = new RoleMiddeware();

const { getUsers, activateUser, deactivateUser, deleteUser } = user;
const { verifyToken } = verify;
const { canModifyUser } = role;
// canModifyUser,
routes.get('/', verifyToken, getUsers);
routes.patch('/activate/:id', verifyToken, activateUser);
routes.patch('/deactivate/:id', verifyToken, deactivateUser);
routes.delete('/delete/:id', verifyToken, deleteUser);

module.exports = routes;
