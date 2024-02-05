// Import necessary modules and types
import { OkPacket } from 'mysql';
import { execute } from '../src/services/mysql.connector';
import { Album } from './albums.model';
import { albumQueries } from './albums.queries';

// Function to read all albums from the database
export const readAlbums = async () => {
  return execute<Album[]>(albumQueries.readAlbums, []);
};

// Function to read albums by a specific artist
export const readAlbumsByArtist = async (artistName: string) => {
  return execute<Album[]>(albumQueries.readAlbumsByArtist, [artistName]);
};

// Function to read albums by searching for artist's name
export const readAlbumsByArtistSearch = async (search: string) => {
  console.log('search param', search);
  return execute<Album[]>(albumQueries.readAlbumsByArtistSearch, [search]);
};

// Function to read albums by searching for album descriptions
export const readAlbumsByDescriptionSearch = async (search: string) => {
  console.log('search param', search);
  return execute<Album[]>(albumQueries.readAlbumsByDescriptionSearch, [search]);
};

// Function to read albums by a specific album ID
export const readAlbumsByAlbumId = async (albumId: number) => {
  return execute<Album[]>(albumQueries.readAlbumsByAlbumId, [albumId]);
};

// Function to create a new album in the database
export const createAlbum = async (album: Album) => {
  return execute<OkPacket>(albumQueries.createAlbum, 
    [album.title, album.artist, album.description, album.year, album.image]);
};

// Function to update an existing album in the database
export const updateAlbum = async (album: Album) => {
  return execute<OkPacket>(albumQueries.updateAlbum, 
    [album.title, album.artist, album.year, album.image, album.description, album.albumId]);
};

// Function to delete an album from the database by its ID
export const deleteAlbum = async (albumId: number) => {
  return execute<OkPacket>(albumQueries.deleteAlbum, [albumId]);
};
