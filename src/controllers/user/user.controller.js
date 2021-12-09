import { User } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import { auth } from 'firebase-admin';

export const profile = async (req, res) => {
  try {
    return successResponse(req, res, req.user);
  } catch (error) {
    return errorResponse(req, res, "Forbidden", 400);
  }
};

export const updateProfile = async (req, res) => {
  const { body } = req;
  try {
    const { uid } = req.user;
    const resp = await User.update(body, {where: {uid}});
    return successResponse(req, res, resp);
  } catch (error) {
    return errorResponse(req, res, "Server Error");
  }
}

export const login = async (req, res) => {
  try {
    const { user } = req;
    successResponse(req, res, { user });
   
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
};

export const register = async (req, res) => {
  try {
    const authResp = await auth().verifyIdToken(req.headers.authorization);
    const { uid } = authResp;
    const { name, nik, phoneNumber } = req.body;
    console.log({name, nik, phoneNumber});
    const user = await User.create({ uid, name, nik, phoneNumber });
    successResponse(req, res, { user });
   
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
};
