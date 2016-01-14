'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 7381 });



// server.register(require('hapi-auth-bearer-token'), function (err) {
//     if (err) {
//         server.log(['error', 'session'], err);
//     }
//
//     server.auth.strategy('simple', 'bearer-access-token', 'optional', {
//         validateFunc: function (s) {
//           var server = s;
//           return function (token, cb) {
//             console.log('TOKEN:' + token);
//               cb(null, true, {token:token, id: token});
//           }
//         }
//       });
// });

server.route(require('./routes/getRecommendations'));


const afterRegister = (err) => {
    if (err) {
        console.error('Failed loading "hapi-node-postgres" plugin');
    }
}

server.register({
    register: require('./pg'),
    options: {
        connectionString: 'postgres://iosl:yelpling@localhost/iosl'
    }
  }, afterRegister);

server.register({
    register: require('good'),
    options: {
        opsInterval: 1000,
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }]
    }
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {
            console.info('Server started at ' + server.info.uri);
        });
    }
});
