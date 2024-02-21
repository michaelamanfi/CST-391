import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './addproduct/addproduct.component';
import { EditProductComponent } from './editproduct/editproduct.component';
import { ViewProductComponent } from './viewproduct/viewproduct.component';

const routes: Routes = [
  { path: 'view', component: ViewProductComponent },
  { path: 'create', component: AddProductComponent },
  { path: 'edit/:productId', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
