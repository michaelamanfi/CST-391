// Import required modules and types
import { Request, RequestHandler, Response } from 'express';
import { Album } from './albums.model';
import { Track } from '../tracks/tracks.model';
import * as AlbumDao from '../albums/albums.dao';
import * as TracksDao from '../tracks/tracks.dao';
import { OkPacket } from 'mysql';

// Define a RequestHandler to read albums
export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
  try {
    let albums;
    let albumId = parseInt(req.query.albumId as string);

    console.log('albumId', albumId);

    // Check if albumId is a valid number, if not, read all albums
    if (Number.isNaN(albumId)) {
      albums = await AlbumDao.readAlbums();
    } else {
      // Read albums by specific albumId
      albums = await AlbumDao.readAlbumsByAlbumId(albumId);
    }

    // Call readTracks function to fetch associated tracks for each album
    await readTracks(albums, res);

    // Send the fetched albums as a JSON response
    res.status(200).json(albums);
  } catch (error) {
    // Handle errors and send an error response if something goes wrong
    console.error('[albums.controller][readAlbums][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching albums'
    });
  }
};

// Define a RequestHandler to read albums by artist
export const readAlbumsByArtist: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Read albums by the artist specified in the request parameter
    console.log("Artist: "+req.query.artist);
    const albums = await AlbumDao.readAlbumsByArtist(req.query.artist as string);

    // Call readTracks function to fetch associated tracks for each album
    await readTracks(albums, res);

    // Send the fetched albums as a JSON response
    res.status(200).json(albums);
  } catch (error) {
    // Handle errors and send an error response if something goes wrong
    console.error('[albums.controller][readAlbums][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching albums'
    });
  }
};

// Define a RequestHandler to read albums by artist search
export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
  try {
    console.log('search', req.params.search);

    // Read albums by artist search (using a pattern)
    const albums = await AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');

    // Call readTracks function to fetch associated tracks for each album
    await readTracks(albums, res);

    // Send the fetched albums as a JSON response
    res.status(200).json(albums);
  } catch (error) {
    // Handle errors and send an error response if something goes wrong
    console.error('[albums.controller][readAlbums][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching albums'
    });
  }
};

// Define a RequestHandler to read albums by description search
export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
  try {
    console.log('search', req.params.search);

    // Read albums by description search (using a pattern)
    const albums = await AlbumDao.readAlbumsByDescriptionSearch('%' + req.params.search + '%');

    // Call readTracks function to fetch associated tracks for each album
    await readTracks(albums, res);

    // Send the fetched albums as a JSON response
    res.status(200).json(albums);
  } catch (error) {
    // Handle errors and send an error response if something goes wrong
    console.error('[albums.controller][readAlbums][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching albums'
    });
  }
};

// Define a RequestHandler to create an album and its associated tracks
export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Create a new album and get the response as an OkPacket
    const okPacket: OkPacket = await AlbumDao.createAlbum(req.body);

    console.log('req.body', req.body);
    console.log('album', okPacket);

    // Iterate through the tracks in the request body and create each track
    req.body.tracks.forEach(async (track: Track, index: number) => {
      try {
        await TracksDao.createTrack(track, index, okPacket.insertId);
      } catch (error) {
        // Handle errors when creating tracks and send an error response
        console.error('[albums.controller][createAlbumTracks][Error] ', error);
        res.status(500).json({
          message: 'There was an error when writing album tracks'
        });
      }
    });

    // Send a success response with the OkPacket
    res.status(200).json(okPacket);
  } catch (error) {
    // Handle errors when creating albums and send an error response
    console.error('[albums.controller][createAlbum][Error] ', error);
    res.status(500).json({
      message: 'There was an error when writing albums'
    });
  }
};

// Define a RequestHandler to update an album and its associated tracks
export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Update an existing album and get the response as an OkPacket
    const okPacket: OkPacket = await AlbumDao.updateAlbum(req.body);

    console.log('req.body', req.body);
    console.log('album', okPacket);

    // Iterate through the tracks in the request body and update each track
    req.body.tracks.forEach(async (track: Track, index: number) => {
      try {
        await TracksDao.updateTrack(track);
      } catch (error) {
        // Handle errors when updating tracks and send an error response
        console.error('[albums.controller][updateAlbum][Error] ', error);
        res.status(500).json({
          message: 'There was an error when updating album tracks'
        });
      }
    });

    // Send a success response with the OkPacket
    res.status(200).json(okPacket);
  } catch (error) {
    // Handle errors when updating albums and send an error response
    console.error('[albums.controller][updateAlbum][Error] ', error);
    res.status(500).json({
      message: 'There was an error when updating albums'
    });
  }
};

// Function to read tracks for a list of albums
async function readTracks(albums: Album[], res: Response<any, Record<string, any>>) {
  for (let i = 0; i < albums.length; i++) {
    try {
      // Read tracks for a specific album and assign them to the album object
      const tracks = await TracksDao.readTracks(albums[i].albumId);
      albums[i].tracks = tracks;
    } catch (error) {
      // Handle errors when fetching album tracks and send an error response
      console.error('[albums.controller][readTracks][Error] ', error);
      res.status(500).json({
        message: 'There was an error when fetching album tracks'
      });
    }
  }
}

// Define a RequestHandler to delete an album by its ID
export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
  try {
    let albumId = parseInt(req.params.albumId as string);

    console.log('albumId', albumId);

    // Check if albumId is a valid number, if so, delete the album
    if (!Number.isNaN(albumId)) {
      const response = await AlbumDao.deleteAlbum(albumId);

      // Send a success response with the deleted album information
      res.status(200).json(response);
    } else {
      // If albumId is not a valid number, throw an error
      throw new Error("Integer expected for albumId");
    }
  } catch (error) {
    // Handle errors when deleting albums and send an error response
    console.error('[albums.controller][deleteAlbum][Error] ', error);
    res.status(500).json({
      message: 'There was an error when deleting albums'
    });
  }
};
