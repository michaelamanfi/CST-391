// Import statements bring in React, the Product component for individual product display, and the useNavigate hook for navigation.
import React from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';

// The ProductList component accepts props, potentially including a list of products among other data.
const ProductList = (props) => {
    // The useNavigate hook is used for programmatically changing routes, for instance, to the edit page of a product.
    const navigate = useNavigate();

    // handleSelection is a function that logs the selected product ID and navigates to the edit page for that product.
    const handleSelection = (productId) => {
        console.log('Selected ID is ' + productId);
        navigate(`/edit/${productId}`);
    };

    // Logging for debugging purposes to see the props passed to the ProductList, especially the productList.
    console.log('props productList', props);

    // Mapping through the productList provided in props, rendering a Product component for each product in the list.
    // Each Product component is passed several props derived from each product object, including a unique key (productId),
    // and the onClick prop which is the handleSelection function configured to navigate to the edit page of the clicked product.
    const products = props.productList.map((product) => {
        return (
            <Product
                key={product.productId}
                productId={product.productId}
                productName={product.name}
                productDescription={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                onClick={() => handleSelection(product.productId)}
            />
        );
    });

    // The return statement renders the list of Product components inside a div container.
    // The container is styled to display its children (Product components) in a flex layout with wrapping enabled, and with a gap of 20px between each product for better visual separation.
    return <div className='container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>{products}</div>;
};

export default ProductList;
