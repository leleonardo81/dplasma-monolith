import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
import errorHandler from './src/middleware/errorHandler';
import * as admin from 'firebase-admin';

dotenv.config();
require('./src/config/sequelize');
var serviceAccount = require("./new-ta-leonardo-firebase-adminsdk-i9i1n-505d834529.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use('', publicRoutes);
app.use(errorHandler);

module.exports = app;
