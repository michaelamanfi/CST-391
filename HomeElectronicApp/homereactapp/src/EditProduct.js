import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource.js';

const EditProduct = (props) => {
    const navigate = useNavigate();

    // Initialize state with the product data from props
    const [productData, setProductData] = useState({
        productId: props.product?.productId,
        name: props.product?.name || '',
        brand: props.product?.brand || '',
        category: props.product?.category || '',
        description: props.product?.description || '',
        price: props.product?.price || 0,
        quantity: props.product?.quantity || 0,
        imageUrl: props.product?.imageUrl || '',
    });

    // Handler for form inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submission data:", productData);

        // Update product
        let response= await dataSource.put(`/products`, productData); 
        console.log("Response data:", response.data);
        
        navigate("/");
        window.location.reload(); // Force the page to reload
    };

    // Handler to cancel form submission and navigate back
    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div key={productData.productId} className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>Edit Product</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />

                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        placeholder="Enter brand"
                    />

                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />

                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                    />

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <div align="center">
                    <button type="button" className="btn btn-warning" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
