'use strict';
module.exports = function(app) {
	var products = require('../controllers/ProductsController');

	// todoList Routes
  	app.route('/products')
    	.get(products.list_all_products)
    	.post(products.create_product);


  	app.route('/products/:prodId')
    	.get(products.read_product)
    	.put(products.update_product)
    	.delete(products.delete_product);
};