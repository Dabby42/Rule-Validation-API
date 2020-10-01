import autoBind from 'auto-bind';
import BaseController from './BaseController';
import Comment from './../../models/Comment';
import Article from './../../models/Article';
import dotenv from 'dotenv';

dotenv.config();

class CommentController extends BaseController {
  constructor() {
    super();
    autoBind(this);
  }

  /**
   * @api {post} /v1/comment/ Create Comment
   * @apiName Create Comment
   * @apiGroup Comments
   * @apiParam {String} articleId id of Article
   * @apiParam {String} comments comment of user
   */
  async createComment(req, res) {
    const { userId, articleId, comments } = req.body;

    try {
      let article = await Article.findOne({ _id: articleId });

      if (!article) {
        return super.notfound(res, `No article found`);
      }

      let comment = await Comment.findOne({ user: userId, article: articleId });
      if (comment) {
        return super.success(res, Comment, 'Comment exist already');
      }
      comment = new Comment({
        article: articleId,
        user: userId,
        comment: comments,
      });
      await comment.save();
      return super.success(res, Comment, 'Created Comment Successfully');
    } catch (error) {
      console.log(error);
      return super.actionFailure(res, `Couldn't create Comment`);
    }
  }

  /**
   * @api {get} /v1/comment Get Users' Comment
   * @apiName Get Comment
   * @apiGroup Comments
   */
  async getComment(req, res) {
    const { userId } = req.body;
    try {
      let comments = await Comment.find({ user: userId, isActive: true })
        .populate('article')
        .exec();

      return super.success(res, comments, 'Comment Retrieved');
    } catch (error) {
      return super.actionFailure(res, `Couldn't get comments`);
    }
  }

  /**
   * @api {delete} /v1/comment/:id Remove Comment
   * @apiName Remove Comment
   * @apiGroup Comments
   * @apiParam {String} id id of Comment
   */
  async removeComment(req, res) {
    const { id } = req.body;
    try {
      let comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $set: { isActive: false } },
        { new: true }
      );
      return super.actionSuccess(res, 'Comment Deleted');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't delete comment`);
    }
  }

  /**
   * @api {patch} /v1/comment/restore/:id Restore Comment
   * @apiName Restore Comment
   * @apiGroup Comments
   * @apiParam {String} id id of Comment
   */
  async restoreComment(req, res) {
    const { id } = req.body;
    try {
      let comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $set: { isActive: true } },
        { new: true }
      );
      return super.actionSuccess(res, 'Comment Restored');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't restore comment`);
    }
  }
}

module.exports = CommentController;
