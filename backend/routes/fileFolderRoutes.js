const express = require('express');
const {
    getFileFolders,
    renameFileFolder,
    deleteFileFolder
} = require('../controllers/filefolderControllers');

const filefolderRouter = express.Router();

// Route to get file folders
filefolderRouter.route('/').post(getFileFolders);

// Route to rename a file or folder
filefolderRouter.route('/:id').patch(renameFileFolder);

// Route to delete a file or folder
filefolderRouter.route('/:id').delete(deleteFileFolder);

module.exports = filefolderRouter;
