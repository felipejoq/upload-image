const multer = require('multer');
const {cloudinary} = require('../config/cloudinary')

// Configurar Multer
const storage = multer.memoryStorage(); // Almacenar la imagen en memoria
const upload = multer(
    {
        storage: storage,
        fileFilter: (req, file, callback) => {
            if (
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png'
            ) {
                callback(null, true);
            } else {
                callback(new Error('El archivo debe ser una imagen .jpg, .jpeg ó .png'));
            }
        },
        limits: {
            fileSize: 200000,
        },
    }
);

const uploadToCloudinary = async (req, res, next) => {

    if (!req.file) {
        return next(new Error('Debes enviar una imagen.'));
    }

    const base64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + base64;

    cloudinary.uploader
        .upload(dataURI, {
            resource_type: "auto",
            overwrite: false,
            folder: "img-uploader-app",
        })
        .then(result => {
            req.cloudinaryUrl = result.secure_url;
            next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
}

module.exports = {upload, uploadToCloudinary};
