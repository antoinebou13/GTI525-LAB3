import { Component } from "react";
import Logo from "./Logo/Logo";
import Banner from "./Banner/Banner";
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div className="Header">
              <Logo/>
              <Banner/>
            </div>   
          );
    }
}

export default Header;