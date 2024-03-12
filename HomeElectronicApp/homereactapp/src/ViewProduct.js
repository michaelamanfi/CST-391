import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataSource from './dataSource';

const ViewProduct = () => {
    const navigate = useNavigate();

    // Get the productId from the Url
    const { productId } = useParams();

    const [product, setProduct] = useState({
        productId: 0,
        name: '',
        brand: '',
        category: '',
        description: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
    });

    useEffect(() => {
        // Load the product to view
        dataSource.get(`/products?productId=${productId}`)
            .then(response => {
                console.log("API Response: ", response);
                setProduct(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);                
            });
    }, [productId]);

    const handleBack = () => {
        navigate('/'); // Navigates back to the home page
    };

    return (
        <div key={product.productId} className="container mt-4">
            <div className="card" style={{ width: '18rem' }}>
                <img src={product.imageUrl || 'default-image-url.jpg'} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
                    <p className="card-text">{product.description}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Category: {product.category}</li>
                        <li className="list-group-item">Price: ${product.price}</li>
                        <li className="list-group-item">Quantity: {product.quantity}</li>
                    </ul>
                </div>
                <div className="card-body">
                    <button className="btn btn-primary" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
