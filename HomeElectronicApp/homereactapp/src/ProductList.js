// ProductList.js
import React from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';

const ProductList = (props) => {
    const navigate = useNavigate();

    const handleSelection = (productId) => {
        console.log('Selected ID is ' + productId);
        navigate(`/edit/${productId}`);
    };

    console.log('props productList', props);
    const products = props.productList.map((product) => {
        return (
            <Product
                key={product.productId}
                productId={product.productId}
                productName={product.name}
                productDescription={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                onClick={handleSelection}
            />
        );
    });
    return <div className='container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>{products}</div>;
};

export default ProductList;
