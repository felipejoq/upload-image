const helmet = require('helmet');

helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'self'"],
        frameAncestors: ["'self'"], // Evita la carga de iframes desde otros orígenes
        formAction: ["'self'"], // Restringe las acciones de formularios a 'self'
        frameSrc: ["'self'"], // Restringe la carga de iframes a 'self'
    },
});

helmet.noSniff();
helmet.xssFilter();

module.exports = helmet;