const {
  fetchProducts,
  fetchProduct,
  create,
  update,
  deletee,
} = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const data = await fetchProducts();
    console.log(data);
    res.status(200).json({
      status: 'success',
      count: data.length,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchProduct(id);
    if (data[0].length) {
      res.status(200).json({ status: 'success', data });
    } else {
      res
        .status(404)
        .json({ status: 'unsuccessful', message: 'cannot find product' });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const data = await create({ name, description, price, quantity });
    console.log(data);
    const dataBaru = await fetchProduct(data[0].insertId);
    res.status(201).json({ status: 'success', dataBaru });
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await fetchProduct(id);
    if (product[0].length) {
      const { name, description, price, quantity } = req.body;
      const data = await update(id, { name, description, price, quantity });
      res.status(200).json({ message: 'success', data });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'cannot found the product',
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await fetchProduct(id);
    if (product[0].length) {
      const deletedData = await deletee(id);
      res.status(200).json({ status: 'success', data: deletedData });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'cannot found the product',
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
