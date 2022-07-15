import { Component } from "react";
import "./MenuStatisticsChart.css";
import axios from "axios";
import configData from "../../../config.json";

class MenuStatisticsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSortby: "day",
        };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        console.log("target: " + e.target.id);
    }

    render() {
        return (
            <div className="MenuStatisticsChart">
                <div className="menu__header">
                    <div className="menu__header-item-sort-arrow">
                    </div>
                    <div className="menu__body">
                    </div>
                </div>
            </div>
        );
    }

}
