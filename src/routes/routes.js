const routes = require('express').Router();
const middleware = require('../shared/middleware');
const createAccount = require('./v1/create-account');
const categoryCreate = require('./v1/create-category');
const productCreate = require('./v1/create-product');
const productDelete = require('./v1/delete-product');
const login = require('./v1/login');
const categoryShow = require('./v1/show-category');
const productShow = require('./v1/show-products');
const priceUpdate = require('./v1/update-price');

//contas
routes.post('/api/v1/account/login', (req, res) => login(req,res));
routes.post('/api/v1/account/create', (req, res) => createAccount(req,res));

//middleware
routes.use((req,res,next) => middleware(req,res,next))

// Api de categoria
routes.post('/api/v1/category/create', (req, res) => categoryCreate(req,res));

routes.get('/api/v1/category/show', (req, res) => categoryShow(req,res));


//api de product
routes.post('/api/v1/product/create', (req, res) => productCreate(req,res));
routes.get('/api/v1/product/show', (req, res) => productShow(req,res));
routes.put('/api/v1/product/:idproduct/update/price', (req, res) => priceUpdate(req,res));
routes.delete('/api/v1/product/:idproduct/delete', (req, res) => productDelete(req,res));




module.exports = routes;