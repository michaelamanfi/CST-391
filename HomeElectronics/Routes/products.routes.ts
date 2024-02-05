import { Router } from 'express';
import * as ProductsController from '../Controllers/products.controller';

// Create an instance of the Express Router
const router = Router();

// Route to retrieve all products/a product
router
  .route('/products')
  .get(ProductsController.readProducts);

  // Route to create a new product
router
.route('/products')
.post(ProductsController.createProduct);

// Route to update an existing product
router
.route('/products')
.put(ProductsController.updateProduct);

// Route to delete an product by its ID
router
.route('/products/:productId')
.delete(ProductsController.deleteProduct);

// Export the router for use in the application
export default router;
