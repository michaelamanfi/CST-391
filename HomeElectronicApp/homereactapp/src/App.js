// Imports necessary React components and hooks, as well as routing capabilities from react-router-dom. 
// Also imports custom components, a data source module for API calls, and stylesheets.
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.js"; // Incorrectly referenced; should likely be HomePage based on usage.
import NavBar from "./NavBar.js";
import ViewProduct from "./ViewProduct.js";
import './App.css';
import dataSource from "./dataSource.js";
import EditProduct from "./EditProduct.js";
import NewProduct from "./NewProduct.js";
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports Bootstrap for styling.

// Defines the main App component.
const App = (props) => {
    // State hooks for managing search phrases and the product list.
    const [searchPhrase, setSearchPhrase] = useState('');
    const [productList, setProductList] = useState([]);

    // Function to load products from a data source (presumably an API).
    const loadProducts = async () => {
        const response = await dataSource.get('/products');
        setProductList(response.data); // Updates the product list state with data fetched.
    };
    
    // A variable to trigger re-rendering or side effects; though it's defined, its update mechanism or use is not implemented.
    let refresh = false;

    // Effect hook to load products when the component mounts or the refresh dependency changes.
    useEffect(() => {
        loadProducts();
    }, [refresh]);

    // Function to update the search phrase state based on user input.
    const updateSearchResults = (phrase) => {
        setSearchPhrase(phrase);
    };

    // Function to navigate to a specific product's page. 
    // It constructs the path using a provided URI and product ID, then uses the navigate function to change the route.
    const updateSingleProduct = (productId, navigate, uri) => {
        let path = uri + productId;
        navigate(path);
    };

    // Functions to reload the product list after editing or adding a new product.
    const onEditProduct = (navigate) => {
        loadProducts();
    };
    
    const onNewProduct = (navigate) => {
        loadProducts();
    };

    // Filters the productList based on the searchPhrase. 
    // If the searchPhrase is empty, all products are shown.
    const renderedList = productList.filter((product) => {
        return product.description.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === '';
    });
    
    // The component's return statement uses the BrowserRouter for SPA navigation.
    // It includes a NavBar and routes for different pages/components (HomePage, NewProduct, EditProduct, ViewProduct).
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <HomePage
                            updateSearchResults={updateSearchResults}
                            productList={renderedList}
                            updateSingleProduct={updateSingleProduct}
                        />
                    }
                />
                <Route path='/new' element={<NewProduct onNewProduct={onNewProduct} />} />
                <Route path='/edit/:productId' element={<EditProduct onEditProduct={onEditProduct} />} />                
                <Route path='/view/:productId' element={<ViewProduct/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
