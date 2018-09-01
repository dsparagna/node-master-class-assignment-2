// Define all the handlers
var handlers = {};

// Message handler
handlers.message = (data, callback) => {
    callback(406, { 'message': 'Hello and welcome to this application!' });
};

// Home handler
handlers.home = (data, callback) => {
    callback(406, { 'message': 'Home' });
};

// Not found handler
handlers.notFound = (data, callback) => {
    callback(404, { 'message': 'Page Not Found' });
};

module.exports = handlers;
