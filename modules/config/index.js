/*
* Create and export configuration variables
*/

var environments = {};

// staging

environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

environments.production = {
    'port': 5000,
    'envName': 'production'
};

// determine which variable should be exported out

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase(): '';

// check that the current env is one of the env above if not default to staging

var environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export the module

module.exports = environmentToExport;

// start the app this way

// NODE_ENV=production node index.js or NODE_ENV=stagin node index.js
