import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProduct = (props) => {
    const { product } = props;
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // Navigates to the previous page
    };

    return (
        <div key={product.productId} className="container mt-4">
            <div className="card" style={{ width: '18rem' }}>
                <img src={product.imageUrl} className="card-img-top" alt={product.name} />
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
