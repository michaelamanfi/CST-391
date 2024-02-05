import { Router } from 'express';
import * as AlbumsController from './albums.controller';

// Create an instance of the Express Router
const router = Router();

// Route to retrieve all albums
router
  .route('/albums')
  .get(AlbumsController.readAlbums);

// Route to retrieve albums by a specific artist
router
  .route('/albums/artist')
  .get(AlbumsController.readAlbumsByArtist);

// Route to search for albums by artist's name
router
  .route('/albums/search/artist/:search')
  .get(AlbumsController.readAlbumsByArtistSearch);

// Route to search for albums by description
router
  .route('/albums/search/description/:search')
  .get(AlbumsController.readAlbumsByDescriptionSearch);

// Route to create a new album
router
  .route('/albums')
  .post(AlbumsController.createAlbum);

// Route to update an existing album
router
  .route('/albums')
  .put(AlbumsController.updateAlbum);

// Route to delete an album by its ID
router
  .route('/albums/:albumId')
  .delete(AlbumsController.deleteAlbum);

// Export the router for use in the application
export default router;
