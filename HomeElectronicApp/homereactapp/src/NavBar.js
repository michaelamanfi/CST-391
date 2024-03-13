// Imports necessary dependencies from the 'react' library and the 'Link' component from 'react-router-dom'.
// 'Link' is used for navigation between components without a full page reload, preserving the SPA behavior.
import React from 'react';
import { Link } from 'react-router-dom';

// Defines the NavBar functional component.
const NavBar = () => {
    return (
        // Utilizes Bootstrap classes for styling and behavior. This 'nav' element acts as the container for the navigation bar.
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <span className='navbar-brand'>
                Home Electronics App
            </span>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <Link className='nav-item nav-link' to='/'>Home</Link>
                    <Link className='nav-item nav-link' to='/'>Products</Link>
                    <Link className='nav-item nav-link' to='/new'>Add Product</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
