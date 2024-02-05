import { Product } from '../Models/products.model';
import { execute } from '../Services/mysql.data.service';
import { productQueries } from '../Queries/products.queries'
import { OkPacket } from 'mysql';

// Function to read all products from the database
export const readProducts = async () => {
    return execute<Product[]>(productQueries.readProducts, []);
};

// Function to read product by Id from the database
export const readProductById = async (productId: number) => {
    return execute<Product[]>(productQueries.readProductById, [productId]);
};

// Function to create a new product in the database
export const createProduct = async (product: Product) => {
    return execute<OkPacket>(productQueries.createProduct, 
      [product.name,product.brand,product.category,product.description,product.price,product.quantity,product.url,product.imageUrl]);
};

// Function to update a product in the database
export const updateProduct = async (product: Product) => {
    return execute<OkPacket>(productQueries.createProduct, 
      [product.name,product.brand,product.category,product.description,product.price,product.quantity,product.url,product.imageUrl,product.productId]);
};
// Function to delete a product in the database
export const deleteProduct = async (productId: number) => {
    return execute<OkPacket>(productQueries.createProduct, [productId]);
};
