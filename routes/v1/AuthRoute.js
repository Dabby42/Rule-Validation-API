const express = require('express');
const routes = express.Router();
const AuthController = require('./../../controllers/v1/AuthController');
const AuthValidator = require('./../../validations/v1/AuthValidator');
const verifyTokenMiddleware = require('./../../middleware/VerifyTokenMiddleware');

const { register, getProfile, updateProfile, login } = new AuthController();
const {
  validatePasswordLogin,
  validateAuth,
  validateProfile,
} = new AuthValidator();
const { verifyRefreshToken, verifyToken } = new verifyTokenMiddleware();

routes.post('/profile', validateProfile, verifyToken, updateProfile);
routes.get('/profile', verifyToken, getProfile);
routes.post('/login', validatePasswordLogin, login);
routes.post('/register', validateAuth, register);

module.exports = routes;
