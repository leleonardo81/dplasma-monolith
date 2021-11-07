// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import axios from 'axios';
import { User } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import { auth } from 'firebase-admin';

// export const allUsers = async (req, res) => {
//   try {
//     const page = req.params.page || 1;
//     const limit = 2;
//     const users = await User.findAndCountAll({
//       order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
//       offset: (page - 1) * limit,
//       limit,
//     });
//     return successResponse(req, res, { users });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

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

// export const changePassword = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const user = await User.scope('withSecretColumns').findOne({
//       where: { id: userId },
//     });

//     const reqPass = crypto
//       .createHash('md5')
//       .update(req.body.oldPassword)
//       .digest('hex');
//     if (reqPass !== user.password) {
//       throw new Error('Old password is incorrect');
//     }

//     const newPass = crypto
//       .createHash('md5')
//       .update(req.body.newPassword)
//       .digest('hex');

//     await User.update({ password: newPass }, { where: { id: user.id } });
//     return successResponse(req, res, {});
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

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
    // console.log(req.body.token);
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

// export const test = (req,res) => {
//   successResponse(req, res, "HELLOWORLD");
// }