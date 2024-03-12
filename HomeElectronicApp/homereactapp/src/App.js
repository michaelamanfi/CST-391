import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchProducts from "./SearchProducts.js";
import NavBar from "./NavBar.js";
import ViewProduct from "./ViewProduct.js";
import './App.css';
import dataSource from "./dataSource.js";
import EditProduct from "./EditProduct.js";
import NewProduct from "./NewProduct.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [productList, setProductList] = useState([]);
    const [currentlySelectedProductId, setCurrentlySelectedProductId] = useState(0);

    const loadProducts = async () => {
        const response = await dataSource.get('/products');
        setProductList(response.data);
    }
    
    let refresh = false;

    useEffect(() => {
        loadProducts();
    }, [refresh]);

    const updateSearchResults = (phrase) => {
        setSearchPhrase(phrase);
    };

    const updateSingleProduct = (productId, navigate, uri) => {
        let indexNumber = productList.findIndex(product => product.productId === productId);
        setCurrentlySelectedProductId(indexNumber);
        let path = uri + productId;
        navigate(path);
    };

    const onEditProduct = (navigate) => {
        loadProducts();
    }
    
    const onNewProduct = (navigate) => {
        loadProducts();
    }

    const renderedList = productList.filter((product) => {
        return product.description.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === '';
    });
    
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <SearchProducts
                            updateSearchResults={updateSearchResults}
                            productList={renderedList}
                            updateSingleProduct={updateSingleProduct}
                        />
                    }
                />
                <Route path='/new' element={<NewProduct onNewProduct={onNewProduct} />} />
                <Route path='/edit/:productId' element={<EditProduct onEditProduct={onEditProduct} product={productList[currentlySelectedProductId]}/>} />
                <Route path='/view/:productId' element={<ViewProduct product={productList[currentlySelectedProductId]} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
