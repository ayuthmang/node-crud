const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../../lib/db');

const baseUrl = `http://localhost:${process.env.PORT || 3000}`;

router.get('/products', async function(req, res, next) {
  try {
    const products = await db('products').select('*');
    res.render('products/index', { title: 'Express', products });
  } catch (error) {
    next(error);
  }
});

router.get('/products/new', async function(req, res, next) {
  res.render('products/new');
});

router.get('/products/edit/:productId', async function(req, res, next) {
  const productId = req.params.productId;
  try {
    const apiResponse = await axios.get(`${baseUrl}/api/products/${productId}`);
    const product = apiResponse.data && apiResponse.data[0];
    console.log(product);
    res.render('products/edit', { product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
