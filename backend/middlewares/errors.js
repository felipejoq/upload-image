const {MulterError} = require("multer");
const handleFileUploadError = (err, req, res, next) => {

    if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res
                .status(400)
                .json({
                    ok: false,
                    error: 'El archivo es demasiado grande. El tamaño máximo permitido es 200 KB.'
                });
        }
    } else {
        return res
            .status(400)
            .json({
                ok: false,
                error: err.message
            });
    }

    if (!req.cloudinaryUrl) {
        return res
            .status(400)
            .json({
                ok: false,
                error: 'Hubo un problema al subir su imagen.'
            });
    }

};

const handleGenericError = (err, req, res, next) => {

    if (err) {
        return res
            .status(500)
            .json({
                ok: false,
                error: 'Hubo un problema al subir la imagen. Contacte al administrador ' + JSON.stringify(err)
            });
    }

    next();
}

module.exports = {
    handleFileUploadError,
    handleGenericError
};
