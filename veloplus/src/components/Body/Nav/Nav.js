import { Component } from "react";
import './Nav.css'

class Nav extends Component {

    // changer la couleur du bouton lors on click
    changeColor = (e) => {
      console.log(e.target); 
      /*
      if(e.target.className =="comptages velos"){
        e.target.classList.add('colored');
        
      }

      if(e.target.classList.contains('colored')){
        e.target.classList.remove('colored');
        console.log('remove');
      }else {
        e.target.classList.add('colored');
        console.log('add');
      }
      */
    }

    render(props) {
      return (
        <div className="Nav">
         <nav>
            <ul id="menu-vertical">
                <li>
                  <button onClick = {this.props.setDisplayBikeCounter} className="comptages velos">comptages de vélos</button>  
                </li>
                <li>
                  <button onClick = {this.props.setDisplayPointsInteret} className="points d'interets" >points d'interet</button> 
                </li>
            </ul>
        </nav>
        </div>
      );
    }
  }
export default Nav;