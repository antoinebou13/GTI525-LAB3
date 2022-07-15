import { Component } from "react";
import BikeCounter from "./BikeCounter/BikeCounter";
import PointsInteret from "./PointsInteret/PointsInteret";
import StatisticsChart from "./StatisticsChart/StatisticsChart";
import Nav from "./Nav/Nav";
import "./Body.css";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBikeCounter: false,
      displayPointsInteret: false,
      displayStatisticsChart: false,
      dateDepart: "",
      dateArrivee: "",
      currentId: -1,    // id du compteur sélectionné 
    };
  }

  // Function to set the parent's state
  // setState(updater, [callback]) callback ; executer apres le changement
  setDisplayBikeCounter = () => {
    console.log("ici changement bike counter");
    this.setState({
      displayBikeCounter: true,
    });
    this.setState({
      displayPointsInteret: false,
      displayStatisticsChart: false,
    });
  };
  setDisplayPointsInteret = () => {
    console.log("ici changement points int");
    this.setState({
      displayPointsInteret: true,
    });
    this.setState({
      displayBikeCounter: false,
      displayStatisticsChart: false,
    });
  };

  setDisplayStatisticsChart = () => {
    console.log("ici changement points int");
    this.setState({
      displayStatisticsChart: true,
    });
    this.setState({
      displayBikeCounter: false,
      displayPointsInteret: false,
    });
  };

  setDateDepart = (dateDepart) => {
    console.log("setDateDepart: " + dateDepart);
    this.setState({
      dateDepart: dateDepart,
    });
  };

  setDateArrivee = (dateArrivee) => {
    console.log("date A: " + dateArrivee);
    this.setState({ dateArrivee: dateArrivee });
  };

  setCurrentId = (currentId) => {
    console.log("current Idd : " + currentId);
    this.setState({ currentId: currentId });
  };

  render() {
    return (
      <div className="Body">
        <Nav
          setDisplayPointsInteret={this.setDisplayPointsInteret}
          setDisplayBikeCounter={this.setDisplayBikeCounter}
        />
        <BikeCounter
          display={this.state.displayBikeCounter}
          setDisplayStatisticsChart={this.setDisplayStatisticsChart}
          setDateDepart={this.setDateDepart}
          setDateArrivee={this.setDateArrivee}
          setCurrentId={this.setCurrentId}
        />
        <PointsInteret display={this.state.displayPointsInteret} />
        <StatisticsChart
          setDisplayBikeCounter={this.setDisplayBikeCounter}
          display={this.state.displayStatisticsChart}
          dateDepart={this.state.dateDepart}
          dateArrivee={this.state.dateArrivee}
          currentId={this.state.currentId}
        />
      </div>
    );
  }
}

export default Body;
