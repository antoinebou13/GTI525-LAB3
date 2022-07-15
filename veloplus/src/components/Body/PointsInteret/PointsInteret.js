import { Component } from "react";
import "./PointsInteret.css";
import axios from "axios";
import Menu from "../Menu/Menu.js";
import configData from "../../../config.json";

class PointsInteret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: ["Arrondissement", "Type", "Nom du lieu", "Adresse", ""],
      body: [],
      currentType: "Arrondissement",
      sortDirection: "desc",
      currentElement: 0,
      extraData: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.initFontainesBody();
  }

  handleClick(e) {
    let currentElement = [...this.state.body[parseInt(e.target.className)], ...this.state.extraData[parseInt(e.target.className)]];
    this.setState({ currentElement: currentElement });
  }

  handleMenu = (currentType, sortDirection) => {
    this.setState({
      currentType: currentType,
      sortDirection: sortDirection,
    });
  };

  initFontainesBody() {
    let filterFontainesBody = [];
    let filterFontainesExtraData = [];

    axios({
      method: "GET",
      url: `${configData["api_url"]}/gti525/v1/fontaines?key=${this.state.currentType}&&sortDirection=${this.state.sortDirection}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    }).then((response) => {
      let body = response.data;
      body.forEach(function (row) {
        let newRow = [];
        newRow.push(row["Arrondissement"]);
        newRow.push("Fontaine à boire"); // Type
        newRow.push(row["Nom_parc_lieu"]);
        newRow.push(row["Intersection"]);
        newRow.push([row["Latitude"], row["Longitude"]]);
        filterFontainesBody.push(newRow);
        newRow = [];
        newRow.push(row["Proximité_jeux_repère"]);
        newRow.push(row["Remarque"]);
        filterFontainesExtraData.push(newRow);
      });
      this.setState({ body: filterFontainesBody, extraData: filterFontainesExtraData, currentElement: filterFontainesBody[0] });
    })
      .catch((error) => {
        console.log(error);
      });
  }

  googleMapsUrl() {
    return (
      "https://maps.google.com/maps?q=" +
      encodeURI(this.state.currentElement[4]) +
      "&t=k&z=17&ie=UTF8&iwloc=&output=embed"
    );
  }

  render() {
    return this.props.display ? (
      <div className="PointsInteret">
        <h2>Points d'interet</h2>
        <div className="column">
          <Menu
            header={this.state.header}
            currentType={this.state.currentType}
            sortDirection={this.state.sortDirection}
            parentCallback={this.handleMenu}
          ></Menu>
          <div className="tabulation">
            <table className="TabPointsInteret">
              <thead>
                <tr>
                  {this.state.header.map((name, index) => {
                    return <th key={index}>{name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.body.map((name, index) => {
                  var bodyIndex = index;
                  return (
                    <tr className={index} key={index} onClick={this.handleClick}>
                      {name.map((value, index) => {
                        if (index === 4) {
                          return (
                            <td key={index} className={bodyIndex} onClick={this.handleClick}>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={"https://maps.google.com/?q=" + value[0] + "," + value[1]}
                              >
                                <img alt="placeholder" src="placeholder.png"></img>
                              </a>
                            </td>
                          );
                        } else {
                          return (
                            <td key={index} className={bodyIndex}>
                              {value}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pointsDetails">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe title="google maps" id="gmap_canvas" src={this.googleMapsUrl()}></iframe>
              </div>
            </div>
            <div className="details">
              <b>Proximité: </b>
              <p className="Proximité">{this.state.currentElement[5]}</p>
              <b>Remarque: </b>
              <p className="Remarque">{this.state.currentElement[6]}</p>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    ) : (
      <div />
    );
  }
}

export default PointsInteret;
