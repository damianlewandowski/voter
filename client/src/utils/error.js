/**
 * @description Extracts error messages from array of error objects and puts it in a single object
 * @param {Array}  errors         - Array of error objects
 * @param {Object} error          - Error object
 * @param {String} error.param    - name of the field
 * @param {String} error.msg      - error message
 */
export const extractErrors = errors => {
  return errors.reduce((errorObj, next) => {
    return {
      ...errorObj,
      [next.param]: next.msg
    };
  }, {});
};
