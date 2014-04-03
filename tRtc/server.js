// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    app = express(),
    https = require('https'),
    http = require('http'),
    server = http.createServer(app);
handlers = require('./handlers');
var config = require('getconfig'),
    uuid = require('node-uuid'),
    crypto = require('crypto');

// var static = require('node-static');

// var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
//     certificate = fs.readFileSync('fakekeys/certificate.pem').toString();

app.use(express.static(__dirname));
// app.use("/home", function (req, res, next) {
//     handlers.home(res, null); 
// });
app.use("/upload", function (req, res, next) {
       postData = '';
       req.setEncoding('utf8');
       req.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
    });
    req.addListener('end', function () {
       handlers.upload(res,postData);
    });

});
//==============socket io server==================================

// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket){

//   socket.on('message', function (message) {
//     console.log('Got message: ', message);
//   });
// });

// function describeRoom(name) {
//     var clients = io.sockets.clients(name);
//     var result = {
//         clients: {}
//     };
//     clients.forEach(function (client) {
//         result.clients[client.id] = client.resources;
//     });
//     return result;
// }

// function safeCb(cb) {
//     if (typeof cb === 'function') {
//         return cb;
//     } else {
//         return function () {};
//     }
// }

// io.sockets.on('connection', function (client) {
//     client.resources = {
//         screen: false,
//         video: true,
//         audio: false
//     };

//     // pass a message to another id
//     client.on('message', function (details) {
//         var otherClient = io.sockets.sockets[details.to];
//         if (!otherClient) return;
//         details.from = client.id;
//         otherClient.emit('message', details);
//     });

//     client.on('shareScreen', function () {
//         client.resources.screen = true;
//     });

//     client.on('unshareScreen', function (type) {
//         client.resources.screen = false;
//         if (client.room) removeFeed('screen');
//     });

//     client.on('join', join);

//     function removeFeed(type) {
//         io.sockets.in(client.room).emit('remove', {
//             id: client.id,
//             type: type
//         });
//     }

//     function join(name, cb) {
//         // sanity check
//         if (typeof name !== 'string') return;
//         // leave any existing rooms
//         if (client.room) removeFeed();
//         safeCb(cb)(null, describeRoom(name));
//         client.join(name);
//         client.room = name;
//     }

//     // we don't want to pass "leave" directly because the
//     // event type string of "socket end" gets passed too.
//     client.on('disconnect', function () {
//         removeFeed();
//     });
//     client.on('leave', removeFeed);

//     client.on('create', function (name, cb) {
//         if (arguments.length == 2) {
//             cb = (typeof cb == 'function') ? cb : function () {};
//             name = name || uuid();
//         } else {
//             cb = name;
//             name = uuid();
//         }
//         // check if exists
//         if (io.sockets.clients(name).length) {
//             safeCb(cb)('taken');
//         } else {
//             join(name);
//             safeCb(cb)(null, name);
//         }
//     });

//     // tell client about stun and turn servers and generate nonces
//     if (config.stunservers) {
//         client.emit('stunservers', config.stunservers);
//     }
//     if (config.turnservers) {
//         // create shared secret nonces for TURN authentication
//         // the process is described in draft-uberti-behave-turn-rest
//         var credentials = [];
//         config.turnservers.forEach(function (server) {
//             var hmac = crypto.createHmac('sha1', server.secret);
//             // default to 86400 seconds timeout unless specified
//             var username = new Date().getTime() + (server.expiry || 86400) + "";
//             hmac.update(username);
//             credentials.push({
//                 username: username,
//                 credential: hmac.digest('base64'),
//                 url: server.url
//             });
//         });
//         client.emit('turnservers', credentials);
//     }
// });
// console.log('uid:'+config.uid);
// if (config.uid) process.setuid(config.uid);
// console.log(' -- signal master is ready to run at: http://localhost:8001' );//+ config.server.port);

// https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
server.listen(8001);


console.log('running on https://localhost:8000 and http://localhost:8001 and socket');
