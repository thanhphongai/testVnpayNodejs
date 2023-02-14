const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// An in-memory array to store our data
let products = [
  { id: 1, name: "Product 1", description: "This is product 1" },
  { id: 2, name: "Product 2", description: "This is product 2" },
  { id: 3, name: "Product 3", description: "This is product 3" }
];

// A route to retrieve all products
app.get('/api/products', (req, res) => {
  return res.json(products);
});

// A route to retrieve a product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  return res.json(product);
});

// A route to create a new product
app.post('/api/products', (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description
  };
  products.push(product);
  return res.json(product);
});

// A route to update a product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  product.name = req.body.name;
  product.description = req.body.description;
  return res.json(product);
});

// A route to delete a product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');
  const deletedProduct = products.splice(productIndex, 1);
  return res.json(deletedProduct[0]);
});

// Start the API server
app.listen(3000, () => {
  console.log('API server started on http://localhost:3000');
});