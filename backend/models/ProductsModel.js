'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema ({
	name: String,
	description: String,
	price: Number,
	owner: String
});

module.exports = mongoose.moodel('Products', ProductSchema);