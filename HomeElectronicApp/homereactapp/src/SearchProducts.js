// SearchProduct.js
import React from 'react';
import SearchForm from './SearchForm.js';
import ProductList from './ProductList.js'; // Assuming you have or will create this component

const SearchProducts = (props) => {
    return (
        <div className='container'>
            <SearchForm onSubmit={props.updateSearchResults} />
            <ProductList productList={props.productList} onClick={props.updateSingleProduct} />
        </div>
    );
};

export default SearchProducts;
