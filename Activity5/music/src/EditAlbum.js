import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource.js';

const EditAlbum = (props) => {
    const navigate = useNavigate();

    // Initialize state with the album data from props, or default values if creating a new album
    const [albumData, setAlbumData] = useState({
        title: props.album?.title || '',
        artist: props.album?.artist || '',
        description: props.album?.description || '',
        year: props.album?.year || '',
        image: props.album?.image || '',
        tracks: props.album?.tracks || [],
    });

    // Determine if we are creating a new album or editing an existing one
    const isNewAlbumCreation = !props.album;

    // Handler for form inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbumData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submission data:", albumData);

        let response;
        if (isNewAlbumCreation) {
            // If creating a new album, use POST method
            response = await dataSource.post('/albums', albumData);
        } else {
            // If editing an existing album, use PUT method and include the album ID
            response = await dataSource.put(`/albums`, albumData);
        }

        console.log("Response data:", response.data);
        // Assuming props.onEditAlbum is a function to handle post-submission logic
        if (props.onEditAlbum) {
            props.onEditAlbum(response.data);
        }
        navigate("/"); // Redirecting to the homepage or list view after form submission
    };

    // Handler to cancel form submission and navigate back
    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>{isNewAlbumCreation ? "Create New" : "Edit"} Album</h1>
                <div className="form-group">
                    <label htmlFor="title">Album Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={albumData.title}
                        onChange={handleChange}
                        placeholder="Enter album title"
                    />

                    <label htmlFor="artist">Artist</label>
                    <input
                        type="text"
                        className="form-control"
                        id="artist"
                        name="artist"
                        value={albumData.artist}
                        onChange={handleChange}
                        placeholder="Enter artist name"
                    />

                    <label htmlFor="description">Album Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={albumData.description}
                        onChange={handleChange}
                        placeholder="Enter album description"
                    />

                    <label htmlFor="year">Year</label>
                    <input
                        type="text"
                        className="form-control"
                        id="year"
                        name="year"
                        value={albumData.year}
                        onChange={handleChange}
                        placeholder="Enter release year"
                    />

                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={albumData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <div align="center">
                    <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditAlbum;
