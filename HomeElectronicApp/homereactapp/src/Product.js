// Necessary imports from React and React Router for navigation, and a dataSource for API interaction.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

// The Product component, which takes destructured product properties as its arguments.
const Product = ({ productId, productName, productDescription, price, imageUrl }) => {
    // Hook from React Router to programmatically navigate between routes.
    const navigate = useNavigate();

    // Function to navigate to the product details page when "view details" action is triggered.
    const handleViewDetails = () => {
        navigate(`/view/${productId}`);
    };

    // Function to navigate to the product edit page when "edit" action is triggered.
    const handleEdit = () => {
        navigate(`/edit/${productId}`);
    };

    // Asynchronous function to handle product deletion.
    const handleDelete = async () => {
        // Uses window.confirm to ask for user confirmation before proceeding with deletion.
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            // If the user confirms, send a DELETE request to the server for the specific product ID.
            await dataSource.delete(`/products/${productId}`);
           
            // After deletion, navigate back to the home page and force a full page reload to update the UI.
            navigate('/'); // Navigate to the home page
            window.location.reload(); // Force the page to reload
        }
    }; 

    return (
        <div key={productId} className='card' style={{ width: '18rem' }}>
            <img src={imageUrl} className="card-img-top" alt={productName} />
            <div className='card-body'>
                <h5 className="card-title">{productName}</h5>
                <p className="card-text">{productDescription}</p>
                <p className="card-text">${price}</p>

                <button className="btn btn-secondary" onClick={handleViewDetails}>View Details</button>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Product;
