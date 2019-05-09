var path = require('path');
module.exports = function (app) {
    var api = require('../assets/js/api.js');
    
    app.route('/')
        .get(function (req, resp) {
            api.createWebPage(resp, path.join(__dirname, '../public/home_page/home.html'), 'text/html');
        });

    app.route('/illness')
        .post(api.getIllness);

    app.use(function (req, res) {
        res.status(404).send(req.originalUrl + ' not found!' )
    });   
}