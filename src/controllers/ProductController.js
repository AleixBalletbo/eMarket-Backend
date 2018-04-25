'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function(req, res) {
  Product.find(null,null,{sort:{createdAt: 'desc'}}, function (err, products) {
    if (err)
      res.status(500).send(err);
    else res.status(200).send(products);
  });
};

exports.create_product = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.status(500).send(err);
    else res.status(201).send(product);
  });
};

exports.read_product = function(req, res) {
  Product.findById(req.params.prodId, function(err, product) {
    if (err)
      res.status(500).send(err);
    else res.status(200).send(product);
  });
};

exports.update_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.prodId}, req.body, {'new': true}, function(err, product) {
    if (err)
      res.status(500).send(err);
    else res.status(200).send(product);
  });
};

exports.delete_product = function(req, res) {
  Product.remove({_id: req.params.prodId}, function(err) {
    if (err)
      res.status(500).send(err);
    else res.status(200).send({ message: 'Product successfully deleted' });
  });
};
