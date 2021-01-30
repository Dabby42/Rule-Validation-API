import autoBind from 'auto-bind';
import Helpers from '../../helpers/helper';

/**
 * Defines methods for validating User's Input
 *
 * @class ArticleValidator
 */
class ArticleValidator extends Helpers {
  constructor() {
    super();
    autoBind(this);
  }
  /**
   * validates User's data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */

  validateArticle(req, res, next) {
      
    const {data, rule} = req.body;  

    const screenedField = super.requiredField(res, req)
    
    const output = super.ruleType(res, screenedField);

    const field = output.rule['field'];
    let firstKey = (/\./).test(field)? field.slice(0, (field.indexOf('.'))): field;
    let secondKey = (/\./).test(field)? field.slice(field.indexOf('.') + 1): null ;
    
    if (output.data.hasOwnProperty(firstKey) === false ) {
      return super.validationFailed(res, null, `field ${field} is missing from data.`)
    }
   
    if (secondKey && output.data[firstKey].hasOwnProperty(secondKey) === true) {
      const result = super.conditionLogic(output.data[firstKey][secondKey], rule, firstKey);
      req.body.results = {result, firstKey, secondKey}
      
      return next()
    } 
    
    if(output.data[firstKey].hasOwnProperty(secondKey) === false && typeof output.data[firstKey] !== 'string'){
      return super.validationFailed(res, null, `field ${field} is missing from data.`)
    }

    let nresult = super.conditionLogic(output.data[firstKey], rule, firstKey);
    req.body.results = {nresult, firstKey, secondKey}
    
    return next();
      
  }
}
module.exports = ArticleValidator;
