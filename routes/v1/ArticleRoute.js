const express = require('express');
const routes = express.Router();
const ArticleController = require('./../../controllers/v1/ArticleController');
const ArticleValidator  = require('../../validations/v1/ArticleValidator');

const {
  createArticle,
  deleteArticle,
  getMe,
  validateRequest

} = new ArticleController();
const {
  validateArticle,
} = new ArticleValidator();

routes.get('/', getMe);
routes.post("/validate-rule", validateArticle, validateRequest)

module.exports = routes;    
