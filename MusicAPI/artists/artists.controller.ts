// Import necessary modules and types from Express and the Artist DAO module
import { Request, RequestHandler, Response } from 'express';
import * as ArtistDao from './artists.dao';

// Define a RequestHandler to read artists
export const readArtists: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Call the readArtists function from the ArtistDao to retrieve a list of artists
    const artists = await ArtistDao.readArtists();

    // Send a successful response with the list of artists in JSON format (HTTP 200 OK)
    res.status(200).json(artists);
  } catch (error) {
    // Handle errors that occur during the process
    console.error('[artists.controller][ReadArtists][Error] ', error);

    // Send an error response with an HTTP 500 status code and a JSON error message
    res.status(500).json({
      message: 'There was an error when fetching artists'
    });
  }
};
