const chai = require("chai");
const chai_http = require("chai-http");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const expect = chai.expect;
const mockgoose = new Mockgoose(mongoose);

chai.use(chai_http);

const app = require('../server');
const Product = mongoose.model('Products');

describe("Operations that involve Products", function () {

    let productId;

    before(function (done) {
        // Connect to a test database
        mockgoose.prepareStorage().then(function () {
            mongoose.Promise = global.Promise;
            mongoose.connect('mongodb://localhost/eMarket', function (error) {
                if (error) console.error(error);
                done();
            });
        });
    });

    beforeEach(function (done) {
        let product = new Product(
            {
                name: "Producte 1",
                description: "Descripció",
                price: "100",
                owner: "user@email.com"
            }
        );
        product.save(function (err, product) {
            productId = product._id;
            done();
        })
    });

    afterEach(function (done) {
        // Drop test database
        mockgoose.helper.reset().then(function() {
            done()
        });
    });

    describe ("Get all products", function () {
        it("should list all available products", function (){
            return chai.request(app)
                .get('/products')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0].name).to.equal("Producte 1");
                });
        });

        it("should detect database errors", function() {
            sinon.stub(Product, 'find');
            Product.find.yields({code: 500, err: 'Internal error'});
            return chai.request(app)
                .get('/products')
                .then(function (res) {
                    expect(res).to.have.status(500);
                    Product.find.restore();
                });
        });
    });

    describe ("Get existing product", function () {
        it("should get an existing product successfully", function () {
            return chai.request(app)
                .get('/products/' + productId)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equal("Producte 1");
                    expect(res.body.description).to.equal("Descripció");
                    expect(res.body.price).to.equal(100);
                    expect(res.body.owner).to.equal("user@email.com")
                });
        });

        it("should detect database errors", function() {
            sinon.stub(Product, 'findById');
            Product.findById.yields({code: 500, err: 'Internal error'});
            return chai.request(app)
                .get('/products/' + productId)
                .then(function (res) {
                    expect(res).to.have.status(500);
                    Product.findById.restore();
                });
        });
    });

    describe ("Create new product", function () {
        it("should create a new product successfully", function () {
            return chai.request(app)
                .post('/products')
                .send(
                    {
                        name: "Nou Producte",
                        description: "Descripció",
                        price: "100",
                        owner: "user@email.com"
                    }
                )
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res.body.name).to.equal("Nou Producte");
                    expect(res.body.description).to.equal("Descripció");
                    expect(res.body.price).to.equal(100);
                    expect(res.body.owner).to.equal("user@email.com");
                })
        });

        it("should detect database errors", function() {
            sinon.stub(Product.prototype, 'save');
            Product.prototype.save.yields({code: 500, err: 'Internal error'});
            return chai.request(app)
                .post('/products')
                .send(
                    {
                        name: "Nou Producte",
                        description: "Descripció",
                        price: "100",
                        owner: "user@email.com"
                    }
                )
                .then(function (res) {
                    expect(res).to.have.status(500);
                    Product.prototype.save.restore();
                });
        });
    });

    describe ("Update existing product", function () {
        it("should update an existing product successfully", function () {
            return chai.request(app)
                .put('/products/' + productId)
                .send(
                    {
                        name: "Producte 1",
                        description: "Descripció 2",
                        price: "100",
                        owner: "user@email.com"
                    }
                )
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equal("Producte 1");
                    expect(res.body.description).to.equal("Descripció 2");
                    expect(res.body.price).to.equal(100);
                    expect(res.body.owner).to.equal("user@email.com")
                });
        });

        it("should detect database errors", function() {
            sinon.stub(Product, 'findOneAndUpdate');
            Product.findOneAndUpdate.yields({code: 500, err: 'Internal error'});
            return chai.request(app)
                .put('/products/' + productId)
                .send(
                    {
                        name: "Nou Producte",
                        description: "Descripció",
                        price: "100",
                        owner: "user@email.com"
                    }
                )
                .then(function (res) {
                    expect(res).to.have.status(500);
                    Product.findOneAndUpdate.restore();
                });
        });
    });

    describe ("Delete existing product", function () {
        it("should delete an existing product successfully", function () {
            return chai.request(app)
                .delete('/products/' + productId)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("Product successfully deleted");
                });
        });

        it("should detect database errors", function() {
            sinon.stub(Product, 'remove');
            Product.remove.yields({code: 500, err: 'Internal error'});
            return chai.request(app)
                .delete('/products/' + productId)
                .then(function (res) {
                    expect(res).to.have.status(500);
                    Product.remove.restore();
                });
        });
    });

});