const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1/products', productRoutes);

//root route
app.get('/', (req, res) => {
  res.send('Hitting root route');
});

//port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
