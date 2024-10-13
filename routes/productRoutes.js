const express = require('express');
const router = express.Router();
const {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../config/db');

router.get('/', async (req, res) => {
  const data = await fetchProducts();
  console.log(data);
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await fetchProduct(id);
  res.send(data);
});

router.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const data = await createProduct({ name, description, price, quantity });
  console.log(data);
  const dataBaru = await fetchProduct(data[0].insertId);
  res.json(dataBaru);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  console.log('di route patch');
  const data = await updateProduct(id, { name, description, price, quantity });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await deleteProduct(id);
  res.json(data);
});

module.exports = router;
