import Helpers from '../../helpers/helper';
const isBase64 = require('is-base64');
/**
 * Defines methods for validating Bookmark functions
 *
 * @class CommentValidator
 */
class CommentValidator extends Helpers {
  constructor() {
    super();
  }

  /**
   * validates comment data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateHasId(req, res, next) {
    req.body.id = req.params.id;
    req.check('id', 'id field is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

  /**
   * validates Comment data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateComment(req, res, next) {
    req.check('articleId', 'Article id field is required').notEmpty().trim();

    req.check('comments', 'Comment field is required').notEmpty().trim();

    req.check('userId', 'User id field is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }
}
module.exports = CommentValidator;
