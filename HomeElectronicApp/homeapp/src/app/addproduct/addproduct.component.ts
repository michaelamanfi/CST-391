import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import ProductService from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    productId: 0,
    name: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    url: '',
    imageUrl: ''
  };
  wasSubmitted: boolean = false;

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.productService.createProduct(this.product).subscribe({
      next: (newProduct) => {
        console.log('Product created', newProduct);
        this.wasSubmitted = true;
        this.router.navigate(['/view']); // Navigate to the /view route
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }
  cancel() {
    this.router.navigate(['/view']); // Navigate back to the view route
  }
}
