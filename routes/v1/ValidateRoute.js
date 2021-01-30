const express = require('express');
const routes = express.Router();
const ValidateController = require('../../controllers/v1/ValidateController');
const ArticleValidator  = require('../../validations/v1/ArticleValidator');

const {
  getMe,
  validateRequest
} = new ValidateController();

const {
  validateArticle,
} = new ArticleValidator();

routes.get('/', getMe);
routes.post("/validate-rule", validateArticle, validateRequest)

module.exports = routes;    
