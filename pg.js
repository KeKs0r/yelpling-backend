var Pg = require('pg');

var postgres = function (server, options, next) {

    var query = function (text, cb) {
        Pg.connect(options.connectionString, function (err, client, release) {

            if (err) {
                server.log(['postgres', 'error'], 'Could not connect to PG server. ' + err);
                server.log(['postgres', 'error'], 'ConnectionString: ' + options.connectionString);
                release();
                cb(err);
            } else {
                client.query(text, function (err, result) {
                    if (err) {
                        // Query had an error. Kill this client to make sure we get no consecutive fails
                        release(true);

                        server.log(['postgres', 'error'], 'Could not execute query ' + text + '\n' + err);
                    } else {
                        // Query completed successfully :)
                        release();
                    }
                    cb(err, result);
                });
            }
        });
    };

    server.expose('query', query);

    next();
};

module.exports.register = postgres;
module.exports.register.attributes = {
    name: 'pg',
    version: '0.0.1'
};
