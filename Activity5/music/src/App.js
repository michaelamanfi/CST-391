import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Card from './Card';
import './App.css';
//import albums from './albums.json';
//import SearchForm from './SearchForm';
import dataSource from './dataSource';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import NewAlbum from './NewAlbum';
import OneAlbum from './OneAlbum';

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState([]);    
    const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);

    const updateSearchResults = (phrase) => {
        console.log('phrase is ' + phrase);
        setSearchPhrase(phrase);
      };

  // Setup initialization callback
  useEffect(() => {
    // Update the album list
    loadAlbums();
  }, [searchPhrase]);

  const loadAlbums = async () => {
    const response = await dataSource.get('/albums');
    setAlbumList(response.data);
  };

      const updateSingleAlbum = (id, navigate) => {
        console.log('Update Single Album = ', id);
        console.log('Update Single Album = ', navigate);
        var indexNumber = 0;
        for (var i = 0; i < albumList.length; ++i) {
          if (albumList[i].id === id) indexNumber = i;
        }
        setCurrentlySelectedAlbumId(indexNumber);
        console.log('update path', '/show/' + indexNumber);
        navigate('/show/' + indexNumber);
      };
      
      const renderedList = () => {
        return albumList.filter((album) => {
          // Check if the album matches the searchPhrase or if the searchPhrase is empty
          if (album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === '') {
            return true;
          }
          return false;
        });
      };
/*
  const renderedList = () => {
    return albumList.map((album) => {
      // Check if the album matches the searchPhrase or if the searchPhrase is empty
      if (album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        searchPhrase === '') {
        return true;
      }
      return false; // Return null for albums that do not match the search criteria
    }).filter(Boolean); // Filter out null values from the resulting array
  };
*/
      return (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <SearchAlbum
                  updateSearchResults={updateSearchResults}
                  albumList={renderedList()}
                  updateSingleAlbum={updateSingleAlbum}
                />
              }
            />
            <Route exact path='/new' element={<NewAlbum />} />
            <Route
              exact path='/show/:albumId'
              element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
            />
          </Routes>
        </BrowserRouter>
      );
      
};

export default App;
