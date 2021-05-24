module.exports = async (ctx, next) => {
  // handle thrown or uncaught exceptions anywhere down the line
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = err.status || 406;
    switch (ctx.response.status) {
      case 204: // No Content
        break;
      case 401: // Unauthorized
        ctx.response.set("WWW-Authenticate", "Basic");
        break;
      case 403: // Forbidden
      case 404: // Not Found
      case 406: // Not Acceptable
      case 409: // Conflict
        ctx.response.body = {
          error_description: err.message,
          error_code: err.code || ctx.response.status,
          data: {},
        };
        break;
      default:
      case 500: // Internal Server Error (for uncaught or programming errors)
        ctx.response.body = {
          error_description: err.message,
          error_code: err.code || ctx.response.status,
          data: {},
        };
        // ctx.app.emit('error', err, ctx); // github.com/koajs/koa/wiki/Error-Handling
        break;
    }
  }
};
