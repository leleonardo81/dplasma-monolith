import { errorResponse } from '../helpers';
import { User } from '../models';
import { auth } from 'firebase-admin';

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers['authorization'])) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }
  const token = req.headers['authorization'];
  try {
    const authResp = await auth().verifyIdToken(token);
    const { uid } = authResp;
    const user = await User.findOne({
      where: { uid },
    });
    if (!user) return errorResponse(req, res, 'User is not found in system', 401);
    req.user = user;
    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided',
      401,
    );
  }
};

export default apiAuth;
