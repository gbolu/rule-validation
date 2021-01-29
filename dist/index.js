"use strict";
var app = require('./app');
require('dotenv').config();
var port = process.env.PORT || 5000;
app.listen(port, function () {
    /* eslint-disable no-console */
    console.log("Listening: http://localhost:" + port);
    /* eslint-enable no-console */
});
