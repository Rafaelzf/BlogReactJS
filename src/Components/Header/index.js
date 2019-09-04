import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './header.css';

class Header extends Component {
    render(){
        return(
            <header id="main-header">
                <div className="content-header">
                    <Link to="/">Blog ReactJS</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>

        )
    }
}

export default Header;