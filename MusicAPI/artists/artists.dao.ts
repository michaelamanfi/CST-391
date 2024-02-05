// Import necessary modules and types
import { execute } from '../src/services/mysql.connector'; // Import the 'execute' function for database queries
import { Artist } from './artists.model'; // Import the Artist model/interface
import { artistQueries } from './artists.queries'; // Import the SQL queries for artists

// Define a function to read artists from the database
export const readArtists = async () => {
  try {
    // Use the 'execute' function to run the 'readArtists' query from 'artists.queries'
    // The query returns an array of Artist objects
    const artists = await execute<Artist[]>(artistQueries.readArtists, []);

    // Return the retrieved list of artists
    return artists;
  } catch (error) {
    // Handle errors that may occur during the database query
    console.error('[artists.dao][readArtists][Error] ', error);

    // If an error occurs, return an empty array or handle it in a more specific way as needed
    return [];
  }
};
