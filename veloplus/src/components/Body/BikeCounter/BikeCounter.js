import { Component } from "react";
import "./BikeCounter.css";
import Menu from "../Menu/Menu.js";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import configData from "../../../config.json";

class BikeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: ["ID", "Nom", "Statut", "Annee implantee", ""],
      body: [],
      currentType: "ID",
      sortDirection: "asc",
      showComponent: false,
      currentElement: 0,
      currentId: -1,
      currentIdCarte: -1,
      currentMap: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.initCompteursBody();
  }

  initCompteursBody() {
    //console.log("current type: " + this.state.currentType);
    //console.log("current sort direction: " + this.state.sortDirection);
    axios
      .get(
        `${configData["api_url"]}/gti525/v1/compteurs?key=${this.state.currentType}&&sortDirection=${this.state.sortDirection}`
      )
      .then((response) => {
        let body = response.data;
        let filterCompteursBody = [];
        body.forEach(function (row) {
          let newRow = [];
          newRow.push(row.ID);
          newRow.push(row.Nom);
          newRow.push(row.Statut);
          newRow.push(row.Annee_implante);
          newRow.push(row.Latitude, row.Longitude);
          filterCompteursBody.push(newRow);
        });
        this.setState({ body: filterCompteursBody });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleMenu = (currentType, sortDirection) => {
    this.setState({
      body: this.state.body,
      currentType: currentType,
      sortDirection: sortDirection,
    });
    this.initCompteursBody();
  };

  mapsUrl(selectedTableRow) {
    let latitudeAverage = 0;
    let longitudeAverage = 0;
    let latitudeTotal = 0;
    let longitudeTotal = 0;

    const red = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
    const blue = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";
    const redIcon = new L.Icon({
      iconUrl: red,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const blueIcon = new L.Icon({
      iconUrl: blue,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const positions = [];
    const markers = [];
    this.state.body.map((elements) => {
      positions.push([elements[4], elements[5]]);
      /* const marker = L.marker([elements[4], elements[5]], { icon: blueIcon });
      markers.push(marker);
      const tableRowId = elements[0]; */

      /*  if (tableRowId == selectedTableRow) {
        markers.forEach((marker) => {
          tableRowNom = elements[1];
          var position = new L.LatLng(elements[4], elements[5]);
          if (JSON.stringify(marker.getLatLng()) === JSON.stringify(position)) {
            marker.setIcon(redIcon); // C'est ce marker qui est sélectionné.
          }
        });
      } */
      return markers;
    });

    for (let i = 0; i < positions.length; i++) {
      latitudeTotal += positions[i][0];
      longitudeTotal += positions[i][1];
    }
    latitudeAverage = latitudeTotal / positions.length;
    longitudeAverage = longitudeTotal / positions.length;

    var html = (
      <div id="map">
        <MapContainer center={[latitudeAverage, longitudeAverage]} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.body.map((elements) => {
            const marker = L.marker([elements[4], elements[5]], { icon: blueIcon });

            const tableRowId = elements[0];

            if (tableRowId == selectedTableRow) {
              var position = new L.LatLng(elements[4], elements[5]);
              if (JSON.stringify(marker.getLatLng()) === JSON.stringify(position)) {
                marker.setIcon(redIcon); // C'est ce marker qui est sélectionné.
              }
            }

            return (
              <Marker key={[elements[4], elements[5]]} position={[elements[4], elements[5]]} icon={marker.getIcon()}>
                <Popup>{elements[1]}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    );
    return html;
  }

  handleClick(event) {
    const selectedTableRow = event.target.id;
    this.setState({ currentId: selectedTableRow });
    this.props.setCurrentId(event.target.id);
  }

  handleClickCarte(event) {
    const selectedTableRow = event.target.id;
    this.setState({ currentMap: this.mapsUrl(selectedTableRow) });
  }

  onChangeDateDepart(e) {
    this.props.setDateDepart(e.target.value);
  }
  onChangeDateArrive(event) {
    this.props.setDateArrivee(event.target.value);
  }

  renderPlageHoraire() {
    return (
      <div className="boiteStats">
        <h3> Statistiques du compteur </h3>
        <p> plage de dates</p>
        <label>
          de :
          <input type="date" name="de" onChange={(e) => this.onChangeDateDepart(e)} />
        </label>
        <label>
          à :
          <input type="date" name="a" onChange={(event) => this.onChangeDateArrive(event)} />
        </label>
        <button onClick={this.props.setDisplayStatisticsChart}>Afficher les resultats</button>
      </div>
    );
  }

  renderStatistique(ID) {
    /* console.log(this.state.body[index][4]); */
    /* var ID = this.state.body.ID; */
    return (
      <td key={ID}>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <img
            alt="placeholder"
            src="placeholder.png"
            style={{ pointerEvents: "all" }}
            id={ID}
            onClick={(event) => {
              this.handleClickCarte(event);
            }}
          ></img>
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Carte
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <div className="map-container">{this.state.currentMap}</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <button id={ID} onClick={(event) => this.handleClick(event)} className="modal-button-statistique">
          Statistiques
        </button>
        {this.state.currentId.toString() === ID.toString() ? this.renderPlageHoraire() : null}
      </td>
    );
  }

  /*renderCell(row, col) {
    return this.renderStatistique(row[col], col);
  }
  renderRow(row, index) {
    return (
      <tr key={index}>
        {row.map((value, index) => {
          this.renderCell(value, index);
        })}
      </tr>
    );
  }*/

  renderBody() {
    return this.state.body.map((row) => {
      return (
        <tr>
          <td key="ID"> {row[0]} </td>
          <td key="Nom"> {row[1]}</td>
          <td key="Statut"> {row[2]}</td>
          <td key="Annee_implante"> {row[3]}</td>
          {this.renderStatistique(row[0])}
        </tr>
      );
    });
  }

  renderTable() {
    return (
      <table>
        <thead>
          <tr key="header">{this.renderHeader()}</tr>
        </thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    );
  }

  renderHeader() {
    return this.state.header.map((value, index) => {
      return <th key={index}>{value}</th>;
    });
  }

  render() {
    return this.props.display ? (
      <div className="BikeCounter">
        <h2>Comptage des vélos</h2>
        <div className="column">
          <Menu
            header={this.state.header}
            currentType={this.state.currentType}
            sortDirection={this.state.sortDirection}
            parentCallback={this.handleMenu}
          ></Menu>
          <div className="tabulation">{this.renderTable()}</div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

export default BikeCounter;
