import { Product } from '../Models/products.model';
import { execute } from '../Services/mysql.data.service';
import { productQueries } from '../Queries/products.queries'
import { OkPacket } from 'mysql';

// This function reads all products from the database
export const readProducts = async () => {
    return execute<Product[]>(productQueries.readProducts, []);
};

// This function reads a product by Id from the database
export const readProductById = async (productId: number) => {
    return execute<Product[]>(productQueries.readProductById, [productId]);
};

// This function creates a new product in the database
export const createProduct = async (product: Product) => {
    return execute<OkPacket>(productQueries.createProduct, 
      [product.name,product.brand,product.category,product.description,product.price,product.quantity,product.url,product.imageUrl]);
};

// This function updates a product in the database
export const updateProduct = async (product: Product) => {
    return execute<OkPacket>(productQueries.updateProduct, 
      [product.name,product.brand,product.category,product.description,product.price,product.quantity,product.url,product.imageUrl,product.productId]);
};
// This function deletes a product in the database
export const deleteProduct = async (productId: number) => {
    return execute<OkPacket>(productQueries.deleteProduct, [productId]);
};
