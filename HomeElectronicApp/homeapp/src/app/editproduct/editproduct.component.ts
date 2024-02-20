
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import ProductService from '../../services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})

export class EditProductComponent implements OnInit {
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

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.params['productId'];
    // Retrieve the specific product.
    this.productService.getByProductId(productId)
      .then(products => {
        this.product = products[0];
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }


  onSubmit(): void {
    // Update the product on Save
    this.productService.updateProduct(this.product).subscribe({
      next: (any) => {
        this.router.navigate(['/view']); // Navigate back to the view page or elsewhere
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/view']); // Navigate away on cancel
  }
}

