// Import the Track interface from another module
import { Track } from '../tracks/tracks.model';

// Define an Album interface to describe the structure of an album object
export interface Album {
  albumId: number;        // Unique identifier for the album, of type number
  title: string;          // Title of the album, of type string
  artist: string;         // Name of the artist or creator of the album, of type string
  description: string;    // Description or information about the album, of type string
  year: string;           // Year when the album was released, of type string
  image: string;          // URL or path to the album's cover image, of type string
  tracks: Track[];        // An array of Track objects representing the album's tracks
}
