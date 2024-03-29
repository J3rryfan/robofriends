import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //* this is the state of the component that can be change and affect by the user
      robots: [],
      searchfield: "",
    };
  }

  onSearchChange = (e) => {
    this.setState({ searchfield: e.target.value });
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
      return response.json().then((users) => {
        this.setState({ robots: users });
      });
    });
  }

  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    if (this.state.robots.length === 0) {
      return <h1> Loading </h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
