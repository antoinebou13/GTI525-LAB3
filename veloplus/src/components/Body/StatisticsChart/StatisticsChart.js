import { Chart as ChartJS } from "chart.js/auto";
import { Component } from "react";
import { Bar, Chart } from "react-chartjs-2";
import "./StatisticsChart.css";
import axios from "axios";
import configData from "../../../config.json";

class StatisticsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: null,
        datasets: [
          {
            label: "Nombre de passages par jour",
            data: [1],
          },
        ],
      },
      dataSortBy: "day",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ dataSortby: parseInt(e.target.className) });
  }

  handleMenu = (currentType) => {
    this.setState({
      dataSortby: currentType,
    });
  };

  initStatisticsChart() {
    this.setState({ data: this.getDataChart() });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.labels === null) {
      return false;
    }
    return true;
  }

  async getDataChart() {
    await axios
      .get(
        `${configData["api_url"]}/compteur/${this.props.currentId}?debut=${this.props.dateDepart
          .split("-")
          .join("")}&&fin=${this.props.dateArrivee.split("-").join("")}`
      )
      .then((response) => {
        let responseData = response.data;
        let days = responseData["countByDay"].length;
        const labels = [];
        for (let i = 0; i < days; i++) {
          labels.push(responseData["countByDay"][i]["date"].slice(0, 10));
        }

        const countData = [];
        for (let i = 0; i < days; i++) {
          countData.push(responseData["countByDay"][i]["count"]);
        }

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Nombre de passages par jour",
              data: countData,
            },
          ],
        };
        this.setState({ data: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    this.getDataChart();
    return this.props.display ? (
      <div id="StatisticsChart" className="StatisticsChart">
        <button onClick={this.props.setDisplayBikeCounter} className="retour">
          Retour
        </button>
        <h4> Ressemblance </h4>
        <div className="boutonRadio">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked={true}
            ></input>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Jour
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"></input>
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Semaine
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"></input>
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Mois
            </label>
          </div>
        </div>
        <h5> Periode: </h5>
        <h6> debut: {this.props.dateDepart}</h6>
        <h6> fin: {this.props.dateArrivee} </h6>
        <Chart type="bar" data={this.state.data} />
      </div>
    ) : (
      <div />
    );
  }
}
export default StatisticsChart;
