import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataSource from './dataSource.js';

const EditProduct = () => {
    const navigate = useNavigate();
    const { productId } = useParams(); // Extracts productId from the URL.
    
    // State for holding and managing the product's data.
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

    // Fetches the product's details on component mount or when productId changes.
    useEffect(() => {
        dataSource.get(`/products?productId=${productId}`)
            .then(response => {
                console.log("API Response: ", response);
                // Assuming the response contains the product data in an array, sets the first item to state.
                setProduct(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);                
            });
    }, [productId]);

    // Updates the product state with the new value whenever an input field is changed.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submits the updated product details. Prevents default form action, logs the submission data, and updates the product in the data source.
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submission data:", product);

        let response= await dataSource.put(`/products`, product); 
        console.log("Response data:", response.data);
        
        // Navigates back to the homepage and forces a page reload.
        navigate("/");
        window.location.reload();
    };

    // Navigates back without making any changes.
    const handleCancel = () => {
        navigate("/");
    };

    // Render the edit form.
    return (
        <div key={product.productId} className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>Edit Product</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />

                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Enter brand"
                    />

                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />

                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                    />

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <div align="center">
                    <button type="button" className="btn btn-warning" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
