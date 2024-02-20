// Import the Injectable decorator from Angular core to define a service class that can be injected into components.
import { Injectable } from '@angular/core';
// Import static JSON data to simulate fetching data from a database or external source.
import example_data from '../../data/sample-music-data.json';
// Import Album, Artist, and Track models to structure the music data within the service.
import { Album } from '../models/album.model';
import { Artist } from '../models/artist.model';
import { Track } from '../models/track.model';

// Use the @Injectable decorator to make this service available across the application.
@Injectable({
  providedIn: 'root'
})

// This class manages music data, including artists and albums.
export class MusicServiceService {
  // Private arrays to store the list of artists and albums, not directly accessible from outside the service.
  private artists: Artist[] = [];
  private albums: Album[] = [];

  // Constructor initializes the service by populating artists and albums with sample data.
  constructor() {
    // Iterate over each album data in the example_data array.
    example_data.forEach((album: any) => {
        // Map each track of the current album to a new Track instance.
        const tracks = album.tracks.map((track: any) =>
          new Track(track.id, track.number, track.title, track.lyrics, track.video));

        // Create a new Album instance with album details and the tracks array.
        const newAlbum = new Album(album.id, album.title, album.artist, album.description, album.year, album.image, tracks);

        // Push the newly created Album instance into the albums array.
        this.albums.push(newAlbum);

        // Create a new Artist instance for the album artist and push it into the artists array.
        this.artists.push(new Artist(0, album.artist));
    });
}


  // This function gets all artists stored in the service.
  public getArtists(): Artist[] {
    return this.artists;
  }

  // This function gets all albums for a specific artist.
  public getAlbums(artist: string): Album[] {
    return this.albums.filter(album => album.Artist === artist);
  }

  // This function finds a specific album by artist and ID.
  public getAlbum(artist: string, id: number): Album | undefined {
    return this.albums.find(album => album.Artist === artist && album.Id === id);
  }

  // This function adds a new album to the service's collection.
  public createAlbum(album: Album): void {
    this.albums.push(album);
  }

  // This function updates an existing album in the collection.
  public updateAlbum(album: Album): void {
    const index = this.albums.findIndex(a => a.Id === album.Id);
    if (index !== -1) {
      this.albums[index] = album;
    }
  }

  // This function removes an album from the collection by its ID.
  public deleteAlbum(id: number, artist: string): void {
    const index = this.albums.findIndex(a => a.Id  === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
    }
  }
}
