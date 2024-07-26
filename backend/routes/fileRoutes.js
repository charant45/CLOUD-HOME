const express = require('express');
const uploadFileMulter = require('../config/uploadFileMulter');
const { createFile } = require('../controllers/fileControllers');

const fileRouter = express.Router();

fileRouter.route("/").post(uploadFileMulter.single("file"), createFile);

module.exports = fileRouter;