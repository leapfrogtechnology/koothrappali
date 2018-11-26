/**
 * Middleware to send response in same format
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export default function response(request, response, next) {
  response.success = function(data) {
    return response.json({
      data: data
    });
  };
  next();
}
