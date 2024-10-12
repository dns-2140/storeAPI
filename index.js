const express = require('express');
const app = express();
const {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./config/db');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.send('Hitting root route');
});

app.get('/products', async (req, res) => {
  const data = await fetchProducts();
  console.log(data);
  res.json(data);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await fetchProduct(id);
  res.send(data);
});

app.post('/products', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const data = await createProduct({ name, description, price, quantity });
  console.log(data);
  const dataBaru = await fetchProduct(data[0].insertId);
  res.json(dataBaru);
});

app.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  console.log('di route patch');
  const data = await updateProduct(id, { name, description, price, quantity });
  res.json(data);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const data = await deleteProduct(id);
  res.json(data);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
