// Import required modules and types
import { Request, RequestHandler, Response } from 'express';
import * as ProductDao from '../DAO/products.dao'
import { OkPacket } from 'mysql';

// Define a RequestHandler to read all products or product by id
export const readProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
    let products;
    let productId = parseInt(req.query.productId as string);

    console.log('productId', productId); 

    // Check if productId is a valid number, if not, read all products
    if (Number.isNaN(productId)) {
        products = await ProductDao.readProducts();
    } else {
      // Read albums by specific productId
      products = await ProductDao.readProductById(productId);
    }

    // Send the fetched products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and send an error response if something goes wrong
    console.error('[albums.controller][readAlbums][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching albums'
     });
  }
};

// Define a RequestHandler to create a new product in the database.
export const createProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Create a new product and get the response as an OkPacket
    const okPacket: OkPacket = await ProductDao.createProduct(req.body);

    console.log('req.body', req.body);
    console.log('product', okPacket);

    // Send a success response with the OkPacket
    res.status(200).json(okPacket);
  } catch (error) {
    // Handle errors when creating products and send an error response
    console.error('[products.controller][createProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when writing products'
    });
  }
};

// Define a RequestHandler to update a product.
export const updateProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Update an existing product and get the response as an OkPacket
    const okPacket: OkPacket = await ProductDao.updateProduct(req.body);

    console.log('req.body', req.body);
    console.log('album', okPacket);

    // Send a success response with the OkPacket
    res.status(200).json(okPacket);
  } catch (error) {
    // Handle errors when updating products and send an error response
    console.error('[products.controller][updateProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when updating products'
    });
  }
};

// Define a RequestHandler to delete a product by its ID
export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    let productId = parseInt(req.params.productId as string);

    console.log('productId', productId);

    // Check if productId is a valid number, if so, delete the product
    if (!Number.isNaN(productId)) {
      const response = await ProductDao.deleteProduct(productId);

      // Send a success response with the deleted product information
      res.status(200).json(response);
    } else {
      // If productId is not a valid number, throw an error
      throw new Error("Integer expected for productId");
    }
  } catch (error) {
    // Handle errors when deleting products and send an error response
    console.error('[products.controller][deleteProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when deleting products'
    });
  }
};
