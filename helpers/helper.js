/* istanbul ignore file */
const constants = require('../config/constants');

const {
  ERROR,
  SUCCESS,
  HTTP_BAD_REQUEST,
  HTTP_OK,
} = constants;

class Helpers {
  /**
   *
   * @param {object} res
   * @param {string} message
   * Formats response for successful action that requires data to be returned
   */
  validationSuccess(res, data, message = 'successful') {
    let response = {
      message,
      status: SUCCESS,
      data,
    };
    return res.status(HTTP_OK).send(response);
  }

  /**
   * 
   * @param {object} res 
   * @param {string} message 
   * formats response caused due to form validation
   */
  validationFailed(res, data, message = 'unprocessable entity'){

    let response = {
      message,
      status: ERROR,
      data,   
    }
    return res.status(HTTP_BAD_REQUEST).send(response);
  }

  /**
   * 
   * @param {object} res 
   * @param {object} meq 
   * Checks for required field
   */

  requiredField(res, req){

    let response = {
      message: 'unprocessable entity',
      status: ERROR,
      data: null,   
    }

    if (req.body.hasOwnProperty('rule') === false) {
      response.message = 'rule is required.';

      return res.status(HTTP_BAD_REQUEST).send(response);
    }

    if (req.body.hasOwnProperty('data') === false) {
      response.message = 'data is required.';

      return res.status(HTTP_BAD_REQUEST).send(response);
    }
    return req.body
  }


  /**
   * 
   * @param {string} key
   * @param {object} rule
   * @param {object} field1
   * formats response based on condition Logic
   */
  conditionLogic(key, rule, field1){
    switch (rule.condition) {
      case 'eq':
        return (key === rule.condition_value);
      
      case 'neq':
        return (key !== rule.condition_value);

      case 'gt':
        return (key > rule.condition_value);

      case 'gte':
        return (key > rule.condition_value) || (key === rule.condition_value);

      case 'contains':
        return (data[field1].hasOwnProperty(rule.condition_value)|| data[field1] === [rule.condition_value]);
  
      default:
        return null;
    }
  }

  /**
   * 
   * @param {object} res
   * @param {object} entry
   * formats response based on type value
   */
  ruleType(res, entry){
    const {data, rule} = entry

    const ruleType = typeof rule;
    const dataType = typeof data;
    
    let response = {
      message: 'unprocessable entity',
      status: ERROR,
      data: null,   
    }

    // console.log((ruleType) !== 'object' && Array.isArray(rule) === true);
    
    if ((ruleType) !== 'object' || Array.isArray(rule) === true) {

      response.message = 'rule should be an object.';

      return res.status(HTTP_BAD_REQUEST).send(response);
    }
    
    if ((dataType !== "string") && (dataType !== "object")) {
      response.message = 'data should be an object.';

      return res.status(HTTP_BAD_REQUEST).send(response);
    } 

    return entry;

  }
}

module.exports = Helpers;
