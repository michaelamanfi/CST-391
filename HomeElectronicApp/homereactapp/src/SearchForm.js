import React, { useState } from 'react'; 

const SearchForm = (props) => { 
    const [inputText, setInputText] = useState(""); 

    const handleChangeInput = (event) => { 
        setInputText(event.target.value); 
    }; 

    const handleFormSubmit = (event) => { 
        event.preventDefault(); 
        props.onSubmit(inputText); 
    }; 
    
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
