const originFilter = (req, res, next) => {
    console.log('ORIGEN: ', req.get('host'))
    const HOST_REQ = req.get('host');
    if (HOST_REQ  !== 'localhost:3000' && HOST_REQ !== 'dev.uncodigo.com') {
        return res
            .status(403)
            .json({
            ok: false,
            message: 'Usted no tiene permisos para acceder a este recurso.'
        });
    }
    next();
}

module.exports = originFilter;