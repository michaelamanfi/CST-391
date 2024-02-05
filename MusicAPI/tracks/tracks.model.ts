// Define an interface named Track
export interface Track {
  trackId: number;   // Unique identifier for the track, of type number
  title: string;     // Title of the track, of type string
  number: number;    // Track number (e.g., 1, 2, 3), of type number
  video: string;     // URL or path to a video associated with the track, of type string
  lyrics: string;    // Lyrics or text associated with the track, of type string
}
