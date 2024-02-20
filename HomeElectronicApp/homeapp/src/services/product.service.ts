import { Product } from "../models/product.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:5001/products';

  // Method to get all products
  public async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      const products: Product[] = await response.json();
      return products;
    } catch (error) {
      // Handle errors such as network issues or JSON parsing problems
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

 // Method to get a product by productId
 public async getByProductId(productId: number): Promise<Product[]> {
    try {
      const url = `${this.baseUrl}?productId=${productId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      const product: Product[] = await response.json();
      return product;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  // Method to create a new product
  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }
  // Method to update an existing product
  public updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}`;
    return this.http.put<Product>(url, product);
  }

  // Method to delete a product by productId
  public deleteProduct(productId: number): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url);
  }
}

export default ProductService;
