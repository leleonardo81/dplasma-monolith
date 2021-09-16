import express from 'express';
import { validate } from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as hospitalController from '../controllers/hospital/hospital.controller';
import * as hospitalValidator from '../controllers/hospital/hospital.validator';
import apiAuth from '../middleware/apiAuth';

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post(
  '/auth-login',
  apiAuth,
  userController.login,
);
router.post(
  '/auth-register',
  validate(userValidator.register),
  userController.register,
);
router.post(
  '/test',
  userController.test
)
router.get(
  '/rumah-sakit',
  hospitalController.listRS
)
router.post(
  '/rumah-sakit',
  validate(hospitalValidator.createHospital),
  hospitalController.createRS
)

module.exports = router;
