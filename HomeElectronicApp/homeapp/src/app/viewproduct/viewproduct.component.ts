import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import ProductService from '../../services/product.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})


export class ViewProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Retrieve all products.
    this.productService.getAllProducts()
    .then(products => {
      this.products = products;
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    })
  }

  // Confirm the delete.
  confirmDelete(productId: number): void {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.deleteProduct(productId);
    }
  }

  deleteProduct(productId: number): void {
    // Delete the product, then reload or update the products list
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        // Optionally, filter the deleted product out of the products array instead of reloading
        this.products = this.products.filter(product => product.productId !== productId);
      },
      error: (error) => console.error('Error deleting product:', error)
    });
  }
}
