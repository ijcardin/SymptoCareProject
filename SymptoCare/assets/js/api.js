
const userInfo = require('../../public/userInfo');
var fs = require('fs');

exports.createWebPage = function(response, filePath, contentType) {
    fs.readFile(filePath, function(error, data) {
        if (error) {
            console.log(error);
            response.writeHead(500, {'Content-Type' : 'text/html'});
            response.end('500 - Internal Server Error.');
        }
        if (data) {
            response.writeHead(200, {'Content-Type' : contentType});
            response.end(data);
        }
    });
};

exports.getIllness = function(req, res) {
    res.type('text/plain');
    res.status(200);
    res.setHeader('Access-Control-Allow-Origin', '*');
    userInfo.getIllness1(req.body).then(response => {
        console.log("2");
        console.log(response);
        res.send(response);
    });
};