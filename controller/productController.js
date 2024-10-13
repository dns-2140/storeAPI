const {
  fetchProducts,
  fetchProduct,
  create,
  update,
  deletee,
} = require('../config/db');

const getAllProducts = async (req, res) => {
  const data = await fetchProducts();
  console.log(data);
  res.json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await fetchProduct(id);
  res.send(data);
};

const createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const data = await create({ name, description, price, quantity });
  console.log(data);
  const dataBaru = await fetchProduct(data[0].insertId);
  res.json(dataBaru);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  const data = await update(id, { name, description, price, quantity });
  res.json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const data = await deletee(id);
  res.json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
