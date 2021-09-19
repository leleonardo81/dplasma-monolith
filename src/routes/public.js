import express from 'express';
import { validate } from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as hospitalController from '../controllers/hospital/hospital.controller';
import * as hospitalValidator from '../controllers/hospital/hospital.validator';
import * as donorController from '../controllers/donor/donor.controller';
import * as donorValidator from '../controllers/donor/donor.validator';
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
);
router.get(
  '/rumah-sakit',
  hospitalController.listRS
);
router.post(
  '/rumah-sakit',
  validate(hospitalValidator.createHospital),
  // adminAccess
  hospitalController.createRS
);
router.post(
  '/assesment',
  validate(donorValidator.assesment),
  donorController.assesment
)
router.post(
  '/donor-request',
  validate(donorValidator.postDonorRequest),
  apiAuth,
  donorController.postDonorRequest
);
router.get(
  '/donor-request',
  donorController.getDonorRequest
)

module.exports = router;
