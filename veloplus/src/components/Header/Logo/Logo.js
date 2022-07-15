import { Component } from "react";
import logo from './logo.svg';
import '../Header.css';
import './Logo.css'

class Logo extends Component{
    render() {
        return (
            <div style={{backgroundColor : 'pink'}} className='Logo'>  
                <img src={logo} className="App-logo" alt="logo" /> 
            </div>
        )
    }
}

export default Logo;