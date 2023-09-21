const express = require('express');
const router = express.Router();
const {ping} = require('../controllers/index.js');
const {postUploadImage} = require("../controllers/upload.js");
const {upload, uploadToCloudinary} = require("../middlewares/upload.js");
const {handleFileUploadError, handleGenericError} = require("../middlewares/errors.js");
const originFilter = require("../middlewares/controls");

// Ruta para obtener datos
router.post('/ping', ping);
router.post('/upload',
    upload.single('image'),
    handleFileUploadError,
    uploadToCloudinary,
    handleGenericError,
    postUploadImage
);

module.exports = router;