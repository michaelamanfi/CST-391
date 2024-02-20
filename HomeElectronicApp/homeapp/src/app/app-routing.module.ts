import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './addproduct/addproduct.component';
import { EditProductComponent } from './editproduct/editproduct.component';
import { ViewProductComponent } from './viewproduct/viewproduct.component';
/*
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListArtistsComponent } from './list-artists/list-artists.component';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { DisplayAlbumComponent } from './display-album/display-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
*/
const routes: Routes = [
  { path: 'view', component: ViewProductComponent },
  { path: 'create', component: AddProductComponent },
  { path: 'edit/:productId', component: EditProductComponent },

  /*
  { path: 'list-artists', component: ListArtistsComponent },
  { path: 'list-albums', component: ListAlbumsComponent },
  { path: 'display/:id', component: DisplayAlbumComponent },
  { path: 'edit/:artist/:id', component: EditAlbumComponent },
  { path: 'delete/:artist/:id', component: DeleteAlbumComponent }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
