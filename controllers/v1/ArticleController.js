import autoBind from 'auto-bind';
import BaseController from './BaseController';
import Article from './../../models/Article';
import Comment from './../../models/Comment';
import dotenv from 'dotenv';
import _, { truncate } from 'lodash';
import imageService from './../../services/ImageService';

dotenv.config();

class ArticleController extends BaseController {
  constructor() {
    super();
    autoBind(this);
  }
  /**
   * @api {post} /v1/article Create Article
   * @apiName Create Article
   * @apiGroup Article
   * @apiParam {String} title Article title
   * @apiParam {String} category Article Category
   * @apiParam {String} image Article Image
   * @apiParam {String} content Article Content Description
   */
  async createArticle(req, res) {
    let { contents, subject, category, image } = req.body;

    try {
      //have a default background image

      const service = new imageService('cloudinary');

      // checks if base64 image version exists and uploads to cloudinary
      if (image) {
        if (!super.isValidUrl(image)) {
          const l = await service.uploadBase64Image(image);
          image = l.url;
        }
      }

      let data = {
        subject,
        category,
        contents,
      };

      // checks if image uploaded and add it to the data
      if (image) data.image = image;

      let article = new Article(data);

      await article.save();

      return super.success(res, article, 'Created Article Successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't create article`);
    }
  }

  /**
   * @api {get} /v1/article/:id Get Single Articles
   * @apiName Get Single Articles
   * @apiGroup Article
   */
  async getSingleArticle(req, res) {
    try {
      // console.log(req.params);
      let article = await Article.findOne({ _id: req.params.id });

      return super.success(res, article, 'Article Retrieved');
    } catch (err) {
      // console.log(err);
      return super.actionFailure(res, `Couldn't retrieve article`);
    }
  }

  /**
   * @api {post} /v1/article/comment Comment on article
   * @apiName Comment on article
   * @apiParam {String} article id of the article
   * @apiParam {String} comment user comment
   * @apiGroup Article
   */
  async comment(req, res) {
    try {
      const { article, comment, userId } = req.body;
      let articles = await Article.findOne({ _id: article });
      const comments = new Comment({ user: userId, comment, article });
      await comments.save();
      articles.comments.push(comments);
      await articles.save();
      console.log(comment);
      return super.actionSuccess(res, 'Commented on article');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/article/comment/:id Get Comments on article
   * @apiName Get Comments on article
   * @apiParam {String} article id of the article
   * @apiGroup Article
   */
  async getComments(req, res) {
    try {
      const { id } = req.body;
      let comments = await Comment.find({ article: id })
        .populate('user')
        .exec();

      return super.success(res, comments, 'Commented on article');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/article/uncomment/:id Comment on article
   * @apiName UnComment on article
   * @apiGroup Article
   */
  async uncomment(req, res) {
    try {
      const { id, userId } = req.body;
      await Comment.findOneAndDelete({ _id: id, user: userId });
      return super.actionSuccess(res, 'Comment deleted article');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {patch} /v1/article/publish/:id Publish Article
   * @apiName Publish Article
   * @apiGroup Article
   */
  async publish(req, res) {
    const { id } = req.body;
    try {
      let article = await Article.findOneAndUpdate(
        { _id: id },
        { isActive: true },
        { new: true }
      );
      return super.actionSuccess(res, 'Article Published');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't publish article`);
    }
  }

  /**
   * @api {patch} /v1/article/unpublish/:id Publish Article
   * @apiName Publish Article
   * @apiGroup Article
   */
  async unpublish(req, res) {
    const { id } = req.body;
    try {
      let article = await Article.findOneAndUpdate(
        { _id: id },
        { isActive: false },
        { new: true }
      );
      return super.actionSuccess(res, 'Article UnPublished');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't unpublish article`);
    }
  }

  /**
   * @api {delete} /v1/article/:id Delete Article
   * @apiName Delete Article
   * @apiGroup Article
   */
  async deleteArticle(req, res) {
    const { id } = req.body;
    try {
      let article = await Article.findOneAndDelete({ _id: id });
      return super.actionSuccess(res, 'Article Deleted');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't delete article`);
    }
  }

  /**
   * @api {patch} /v1/article/restore/:id Restore Article
   * @apiName Restore Article
   * @apiGroup Article
   */
  async restoreArticle(req, res) {
    const { id } = req.body;
    try {
      let article = await Article.findOneAndUpdate(
        { _id: id },
        { isActive: true }
      );
      return super.actionSuccess(res, 'Article Restored');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't restored article`);
    }
  }
}

module.exports = ArticleController;
