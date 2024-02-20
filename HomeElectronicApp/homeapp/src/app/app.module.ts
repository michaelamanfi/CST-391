import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductComponent } from './viewproduct/viewproduct.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './editproduct/editproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
