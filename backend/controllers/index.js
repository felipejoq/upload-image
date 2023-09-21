const ping = (req, res) => {
    res.json({
        ok: true,
        message: 'pong'
    })
}

module.exports = {
    ping
}