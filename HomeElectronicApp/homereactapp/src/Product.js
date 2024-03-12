import React from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const Product = ({ productId, productName, productDescription, price, imageUrl }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/view/${productId}`);
    };

    const handleEdit = () => {
        navigate(`/edit/${productId}`);
    };

    const handleDelete = async () => {
        // Confirm with the user
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            await dataSource.delete(`/products/${productId}`);
           
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
