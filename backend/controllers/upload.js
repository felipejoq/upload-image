const postUploadImage = (req, res) => {
    res.json({
        ok: true,
        message: 'Imagen subida con éxito!',
        image: req.cloudinaryUrl
    });
};

module.exports = {
    postUploadImage
};
