var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./src/models/ProductModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/eMarket';
const ENV = process.env.NODE_ENV || 'test';
if (ENV === 'production') {
    mongoose.connect(DB_URL, function (error) {
        if (error) console.error(error);
        else console.log('mongo connected');
    })
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./src/routes/eMarketRoutes'); //importing route
routes(app); //register the route

app.listen(port);

module.exports = app;

console.log('eMarket backend server started on: ' + port);