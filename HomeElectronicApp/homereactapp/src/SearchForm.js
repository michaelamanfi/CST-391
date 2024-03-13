import React, { useState } from 'react';

const SearchForm = (props) => {
    // State hook to keep track of the input text value.
    const [inputText, setInputText] = useState("");

    // Event handler for changes in the input field. Updates the inputText state.
    const handleChangeInput = (event) => {
        setInputText(event.target.value);
    };

    // Event handler for form submission. Prevents the default form submit action,
    // and calls the onSubmit prop function, passing the current input text as an argument.
    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(inputText);
    };

    // Rendering logic for the SearchForm component.
    // The form includes an input field for the search term and a submit button.    
    return ( 
        <div> 
            <form onSubmit={handleFormSubmit}> 
                <div className='form-group'> 
                    <label htmlFor='search-term'>Search Products</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        id='search-term'
                        placeholder='Enter product name, brand, or category' 
                        value={inputText}
                        onChange={handleChangeInput} 
                    /> 
                    <button type="submit" className="btn btn-primary mt-2">Search</button>
                </div> 
            </form> 
        </div> 
    );
}; 

export default SearchForm;
