const express = require('express');
const router = express.Router();
const db = require('../../lib/db');

router.get('/', async function(req, res, next) {
  try {
    const products = await db('products').select('*');
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async function(req, res, next) {
  const productId = req.params.productId;
  try {
    const product = await db('products')
      .select('*')
      .andWhere('id', productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  if (!req.body.name && !req.body.price) {
    res.json({
      message: 'Invalid request'
    });
  }
  let product = {
    name: req.body.name,
    price: req.body.price
  };
  try {
    const result = await db('products').insert(product);
    res.json({
      message: 'product created successfully',
      product: {
        id: result[0]
      }
    });
    // res.redirect('/products');
  } catch (err) {
    next(err);
  }
});

router.patch('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  if (!req.body.name && !req.body.price) {
    res.json({
      message: 'Invalid request'
    });
  }
  const product = {
    id: productId,
    name: req.body.name,
    price: req.body.price
  };
  console.log(product);
  try {
    const dbResult = await db('products')
      .where('id', product.id)
      .update(product);
    res.json({
      message: 'Product updated'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  if (!productId) {
    res.json({
      message: 'Invalid request'
    });
  }
  try {
    const result = await db('products').where('id', productId).del();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
