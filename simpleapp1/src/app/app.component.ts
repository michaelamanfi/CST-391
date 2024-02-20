import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ShopComponent,AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'simpleapp1';
}
