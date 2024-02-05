// Import necessary modules and types
import { execute } from '../src/services/mysql.connector'; // Import the 'execute' function for database queries
import { Track } from './tracks.model'; // Import the Track model/interface
import { trackQueries } from './tracks.queries'; // Import the SQL queries for tracks

// Function to read tracks associated with a specific album
export const readTracks = async (albumId: number) => {
  return execute<Track[]>(trackQueries.readTracks, [albumId]);
};

// Function to create a new track and associate it with an album
export const createTrack = async (track: Track, index: number, albumId: number) => {
  return execute<Track[]>(trackQueries.createTrack, [albumId, track.title, track.number, track.video, track.lyrics]);
};

// Function to update an existing track's information
export const updateTrack = async (track: Track) => {
  return execute<Track[]>(trackQueries.updateTrack, [track.title, track.number, track.video, track.lyrics, track.trackId]);
};
