const Products = require('../models/Products');

const createProduct = async (req, resp) => {
  try {
    const {
      name,
      price,
      image,
      type,
    } = req.body;

    if (!name || !price || !type) {
      return resp.status(400).json({ error: 'Fields name, price and type are required' });
    }

    const product = new Products({
      name,
      price,
      image,
      type,
    });

    const newProduct = await product.save();
    resp.status(201).json({ newProduct });
  } catch (error) {
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, resp) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    resp.json(product);
  } catch (error) {
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProducts = async (req, resp) => {
  try {
    const products = await Products.find();
    resp.json(products);
  } catch (error) {
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, resp) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return resp.status(404).json({ error: 'Product not found' });
    }

    resp.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
