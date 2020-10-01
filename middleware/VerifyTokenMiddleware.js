import jwt from 'jsonwebtoken';
import Middleware from './Middleware';
import secrets from './../config/secrets';
import { VERIFIED } from './../config/enums';

class VerifyTokenMiddleware extends Middleware {
  constructor() {
    super();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * Checks that the header has a valid token
   */
  verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return super.forbidden(res, 'No token provided.');
    token = token.replace('Bearer', '').trim();
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return super.expiredToken(res, 'Token has Expired');
        }

        if (err instanceof jwt.JsonWebTokenError) {
          return super.unauthorized(res, 'Invalid Token');
        }
        return super.unauthorized(res, 'Failed to authenticate token.');
      }
      // if everything good, save to request for use in other routes
      req.body.userId = decoded.id;
      req.body.email = decoded.email;
      // console.log(decoded);
      return next();
    });
  }
}

module.exports = VerifyTokenMiddleware;
