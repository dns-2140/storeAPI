const db = require('mysql2/promise');
require('dotenv').config();

const pool = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function fetchProducts() {
  const [row] = await pool.query('SELECT * FROM products');
  return row;
}

async function fetchProduct(id) {
  const [row] = await pool.query(
    'SELECT * FROM products where product_id = ?',
    [id]
  );
  return [row];
}

async function create(data) {
  console.log('disini');
  const { name, description, price, quantity } = data;
  const row = await pool.query(
    `INSERT INTO products(name, description, price, quantity) VALUES('${name}', '${description}', ${price}, ${quantity})`
  );
  console.log(row);
  return row;
}

async function update(id, dataUpdate) {
  const [targetProduct] = await fetchProduct(id);
  console.log(targetProduct);
  if (targetProduct) {
    const queryArray = [];
    const queryParameter = [];
    const { name, description, price, quantity } = dataUpdate;
    if (name) {
      queryArray.push('name = ?');
      queryParameter.push(name);
    }

    if (description) {
      queryArray.push('description = ?');
      queryParameter.push(description);
    }

    if (price) {
      queryArray.push('price = ?');
      queryParameter.push(price);
    }

    if (quantity) {
      queryArray.push('quantity = ?');
      queryParameter.push(quantity);
    }

    queryParameter.push(+id);

    const queryString = queryArray.join(',');
    console.log(queryString);
    console.log(queryParameter);
    const data = await pool.query(
      `UPDATE products SET ${queryString} WHERE product_id = ?`,
      queryParameter
    );

    const updatedData = await fetchProduct(id);
    return updatedData;
  } else {
    return targetProduct;
  }
}

async function deletee(id) {
  const data = await pool.query('DELETE FROM products WHERE product_id = ?', [
    id,
  ]);
  return data;
}

module.exports = {
  fetchProducts,
  fetchProduct,
  create,
  update,
  deletee,
};
