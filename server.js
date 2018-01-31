var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./backend/models/ProductsModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLDB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./backend/routes/eMarketRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('eMarket backend server started on: ' + port);