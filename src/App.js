import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlbomList from "./Albom";
import Albom from "./Albom/Albom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={AlbomList} />
          <Route path="/:id" component={Albom} />
        </div>
      </Router>
    );
  }
}

export default App;
