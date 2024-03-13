// Imports React library for building the component.
import React from 'react';
// Imports child components that will be used on the homepage.
import SearchForm from './SearchForm.js'; // Component for the search form.
import ProductList from './ProductList.js'; // Component for displaying the list of products.

// Defines the HomePage component with props passed in for dynamic functionality.
const HomePage = (props) => {
    return (
        // Wraps the child components in a div container for layout and styling purposes.
        <div className='container'>
            {/* SearchForm component is used here with an onSubmit event handler.
                The handler is a function passed down from the parent component (App) through props.
                This function updates the search results based on user input. */}
            <SearchForm onSubmit={props.updateSearchResults} />
            
            {/* ProductList component displays the list of products.
                It receives two props: 
                - productList: An array of product objects to be displayed, filtered based on the search criteria.
                - onClick: A function that updates the current product view when a product is clicked, also passed down from the parent component. */}
            <ProductList productList={props.productList} onClick={props.updateSingleProduct} />
        </div>
    );
};

// Exports the HomePage component so it can be used in other parts of the application.
export default HomePage;
