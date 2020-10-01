const express = require('express');
const routes = express.Router();
const CommentController = require('./../../controllers/v1/CommentController');
const CommentValdiator = require('./../../validations/v1/CommentValidator');
const verifyTokenMiddleware = require('./../../middleware/VerifyTokenMiddleware');

const {
  createComment,
  getComment,
  removeComment,
  restoreComment,
} = new CommentController();
const { validateHasId, validateComment } = new CommentValdiator();
const { verifyToken } = new verifyTokenMiddleware();

routes.post('/', verifyToken, validateComment, createComment);
routes.get('/', verifyToken, getComment);
routes.patch('/restore/:id', verifyToken, validateHasId, restoreComment);
routes.delete('/:id', verifyToken, validateHasId, removeComment);

module.exports = routes;
