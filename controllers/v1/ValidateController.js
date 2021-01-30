import autoBind from 'auto-bind';
import BaseController from './BaseController';

class ArticleController extends BaseController {
  constructor() {
    super();
    autoBind(this);
  }

  /**
   * @api {get} / Publish Article
   * @apiName Get Developer's details
   * @apiGroup Rule-Validation
   */
  getMe(req,res){
    const data = {};
    data.name = "Nwafor Daberechukwu Miracle";
    data.github = "@Dabby42";
    data.email = "nwafordabere@gmail.com";
    data.mobile = "08094911826";

    return super.validationSuccess(res, data, 'My Rule-Validation API');
  }


  /**
   * @api {post} /validate-rule Validate Request
   * @apiName Validate User's request
   * @apiGroup Rule-Validation
   */
  validateRequest(req, res){
    const {data} = req.body;
    const {field, condition, condition_value} = req.body.rule;
    const {result, nresult, firstKey, secondKey} = req.body.results;

    let field_value;

    if (secondKey) {
      field_value = data[firstKey][secondKey];
    } else {
      field_value = data[firstKey];
    }

    let ndata = {};

    if (result === false || nresult === false) {
      ndata.validation = {
        error: true,
        field,
        field_value,
        condition,
        condition_value
      }
      return super.validationFailed(res, ndata, `field ${field} failed validation.`)
    }

    ndata.validation = {
      error: false,
      field,
      field_value,
      condition,
      condition_value
    }

    return super.validationSuccess(res, ndata, `field ${field} successfully validated.`);

  } 
}

module.exports = ArticleController;
