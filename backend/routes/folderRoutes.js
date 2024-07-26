const express = require('express');
const { createFolder } = require('../controllers/folderControllers');

const folderRouter = express.Router();

folderRouter.post("/create", createFolder);

module.exports = folderRouter;