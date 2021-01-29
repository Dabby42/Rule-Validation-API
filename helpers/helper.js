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
   * @param {object} errors 
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

  requiredField(res, rule, data){
    if (rule == undefined) {
      return super.validationFailed(res, null, 'rule is required.');
    }

    if (data === undefined) {
      return super.validationFailed(res, null, 'data is required.')
    }
    const field = {rule, data}
    return field;
  }

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

  ruleType(res, entry){
    const {data, rule} = entry

    const ruleType = typeof rule;
    const dataType = typeof data;

    if (ruleType !== "object") {
      return super.validationFailed(res, null, 'rule should be an object.')
    } 
    
    if ((dataType !== "string") && (dataType !== "object")) {
      return super.validationFailed(res, null, 'data should be an object, array or a string.')
    } 

    return entry;

  }

  // checkJSON(data){

  //   try {
  //     JSON.parse(data);

  //   } catch (error) {
  //     return false;
  //   }
  // }


}

module.exports = Helpers;
