import { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: this.props.header,
      currentType: "",
      sortDirection: "asc",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("target: " + e.target.id);
    if (e.target.id === "asc" || e.target.id === "desc") {
      this.setState({ sortDirection: e.target.id });
    } else {
      console.log("type touche");
      this.setState({ currentType: e.target.id });
    }
    this.props.parentCallback(this.state.currentType, this.state.sortDirection);
  }

  render() {
    return (
      <div className="Menu">
        <div className="menu__header">
          <div className="menu__header-item-sort-arrow">
            <button className="menu__header-item-sort-arrow-up" onClick={this.handleClick} id="asc">
              ▲
            </button>
            <button className="menu__header-item-sort-arrow-down" onClick={this.handleClick} id="desc">
              ▼
            </button>
          </div>
          <div className="menu__body">
            {this.state.header.map((item, index) => {
              return (
                <div
                  tabIndex="1"
                  className="menu__body-item"
                  id={item}
                  key={index}
                  data-type={item}
                  onClick={this.handleClick}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
