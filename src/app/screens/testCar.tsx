// @ts-nocheck
import React, { useState, Component } from "react";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    console.log("running componentDidMount");
    this.setState({ color: "blue", model: "Audi" });
  };

  componentDidMount() {
    // runs after first render = RETRIEVE DATA FROM BACKEND SERVER
  }

  componentWillMount() {
    // comonent yo'qolgandan keyin ishga tushadi
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a - {this.state.color} - {this.state.model} - from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Car;
