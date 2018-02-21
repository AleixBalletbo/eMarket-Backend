'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function(req, res) {
  Product.find({}).sort({createdAt: 'desc'}).exec(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.create_product = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.read_product = function(req, res) {
  Product.findById(req.params.prodId, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.update_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.prodId}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.delete_product = function(req, res) {
  Product.remove({_id: req.params.prodId}, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};
