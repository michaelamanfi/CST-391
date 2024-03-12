import React, { useState } from 'react';
import dataSource from "./dataSource.js";
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const product = {
            name,
            brand,
            category,
            description,
            price: Number(price),
            quantity: Number(quantity),
            url,
            imageUrl,
        };

        console.log("Submitting product:", product);
        const response = await dataSource.post('/products', product);
        console.log("Response:", response);
        //Go back
        navigate("/");
        window.location.reload(); // Force the page to reload
    };

    const handleCancel = () => {
        navigate("/");
    };

    // Input update handlers
    const updateInput = (setState) => (event) => {
        setState(event.target.value);
    };

    return (
        <div className='container'>
            <form onSubmit={handleFormSubmit}>
                <h1>Create Product</h1>
                <div className='form-group'>
                    <label htmlFor='productName'>Product Name</label>
                    <input type='text' className='form-control' id='productName' placeholder='Enter Product Name' onChange={updateInput(setName)} />
                    <label htmlFor='productBrand'>Brand</label>
                    <input type='text' className='form-control' id='productBrand' placeholder='Enter Brand' onChange={updateInput(setBrand)} />
                    <label htmlFor='productCategory'>Category</label>
                    <input type='text' className='form-control' id='productCategory' placeholder='Enter Category' onChange={updateInput(setCategory)} />
                    <label htmlFor='productDescription'>Description</label>
                    <textarea className='form-control' id='productDescription' placeholder='Enter Product Description' onChange={updateInput(setDescription)} />
                    <label htmlFor='productPrice'>Price</label>
                    <input type='number' className='form-control' id='productPrice' placeholder='Enter Price' onChange={updateInput(setPrice)} />
                    <label htmlFor='productQuantity'>Quantity</label>
                    <input type='number' className='form-control' id='productQuantity' placeholder='Enter Quantity' onChange={updateInput(setQuantity)} />
                    <label htmlFor='productUrl'>URL</label>
                    <input type='text' className='form-control' id='productUrl' placeholder='Enter Product URL' onChange={updateInput(setUrl)} />
                    <label htmlFor='productImageUrl'>Image URL</label>
                    <input type='text' className='form-control' id='productImageUrl' placeholder='Enter Image URL' onChange={updateInput(setImageUrl)} />
                </div>
                <div align='center'>
                    <button type='button' className='btn btn-warning' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;
