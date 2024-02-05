// Import necessary modules and the controller functions
import { Router } from 'express'; // Import the Express Router
import * as ArtistsController from './artists.controller'; // Import controller functions for artists

// Create an instance of the Express Router
const router = Router();

// Define a route to retrieve a list of artists
router
  .route('/artists')
  .get(ArtistsController.readArtists);

// Export the router for use in the application
export default router;
