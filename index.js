/*
* Homework Assigment #2: Node Master Class
*/

/*
* Set up applications depencies
*/
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handle = require('./modules/handlers');
const config = require('./modules/config');

/*
* Set up app object
*/
let app = {};   

/*
* Create a new HTTP server to run the app
*/
app.server = http.createServer((req, res) => {
    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    console.log("What is the path: ", path);
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;
    console.log("What is the query string: ", queryStringObject);

    // Check for the method
    var method = req.method.toLowerCase();
    console.log("What is the method: ", method);

    // Define the header
    var headers = req.headers;
    console.log("What are the headers: ", headers);

    // Check for payload if exist
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data)=> {
        buffer += decoder.write(data);
    });
    req.on('end', ()=> {
        buffer += decoder.end();

        console.log("What is the payload: ", buffer );

        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handle.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload returned from the handler, or set the default payload to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("What is the status code: ", statusCode);
            console.log("What is the payload string in the response: ", payloadString);
        });
    });
});

// Start the server
app.server.listen( config.port , () => {
    console.log('The server is up and running now');
});

// Handlers
handle.message;
handle.home;
handle.notFound;

// Define the request router
var router = {
    'hello': handle.message,
    'home': handle.home
};