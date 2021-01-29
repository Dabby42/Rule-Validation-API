import autoBind from 'auto-bind';
import Helpers from '../../helpers/helper';

/**
 * Defines methods for validating Article functions
 *
 * @class ArticleValidator
 */
class ArticleValidator extends Helpers {
  constructor() {
    super();
    autoBind(this);
  }
  /**
   * validates Registration data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */

  validateArticle(req, res, next) {
    try {

      const {data, rule} = req.body;  

      const screenedField = super.requiredField(res, rule, data)
      
      const output = super.ruleType(res, screenedField);

      const field = output.rule['field'];
      let firstKey = (/\./).test(field)? field.slice(0, (field.indexOf('.'))): field;
      let secondKey = (/\./).test(field)? field.slice(field.indexOf('.') + 1): null ;
      
      if (output.data.hasOwnProperty(firstKey) === false ) {
        return super.validationFailed(res, null, `field ${field} is missing from data.`)
      }

      if (secondKey && output.data[firstKey].hasOwnProperty(secondKey)) {
        const result = super.conditionLogic(output.data[firstKey][secondKey], rule, firstKey);
        
        // const resultsObj = {result, firstKey, secondKey};
        req.body.results = {result, firstKey, secondKey}
        
        return next()
        
      }

      let nresult = super.conditionLogic(output.data[firstKey], rule, firstKey);
      
      req.body.results = {nresult, firstKey, secondKey}
      
      return next();
      
    } catch (error) {
      return super.validationFailed(res, null, `Invalid JSON payload passed.`)
    }
    
  
  }
  
}
module.exports = ArticleValidator;
