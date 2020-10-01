const express = require('express');
const routes = express.Router();
const ArticleController = require('./../../controllers/v1/ArticleController');
const ArticleValdiator = require('./../../validations/v1/ArticleValidator');
const verifyTokenMiddleware = require('./../../middleware/VerifyTokenMiddleware');

const { verifyToken } = new verifyTokenMiddleware();
const {
  createArticle,
  getComments,
  comment,
  uncomment,
  getSingleArticle,
  deleteArticle,
  restoreArticle,
  publish,
  unpublish,
} = new ArticleController();
const {
  validateArticle,
  validateHasId,
  validateComment,
} = new ArticleValdiator();

routes.post('/', verifyToken, validateArticle, createArticle);
routes.get('/:id', verifyToken, getSingleArticle);
routes.get('/comment/:id', verifyToken, validateHasId, getComments);
routes.post('/comment', verifyToken, validateComment, comment);
routes.post('/uncomment/:id', verifyToken, validateHasId, uncomment);
routes.patch('/publish/:id', verifyToken, validateHasId, publish);
routes.patch('/restore/:id', verifyToken, validateHasId, restoreArticle);
routes.patch('/unpublish/:id', verifyToken, validateHasId, unpublish);

routes.delete('/:id', validateHasId, deleteArticle);

module.exports = routes;
