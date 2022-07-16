import { Component } from "react";
import "./AjoutPointInteret.css";

class AjoutPointInteret extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
    render() {
        return (
            <form method="POST">
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Nom</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Adresse</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Adresse" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Description" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Type</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Type" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Année d'établissement</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Année" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Latitude</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Latitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Longitude</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Longitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Remarque</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Remarque" />
                </div>
            </form>
        );
    }
}

export default AjoutPointInteret;