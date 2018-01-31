'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema ({
	name: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	owner: {type: String, required: true}
});

module.exports = mongoose.model('Products', ProductSchema);