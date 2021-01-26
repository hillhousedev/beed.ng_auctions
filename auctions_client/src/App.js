import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAuction from "./components/add_auction.component";
import Auction from "./components/auction.component";
import AuctionsList from "./components/auctions_list.component";



class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/auctions" className="navbar-brand">
            Beed.ng
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/auctions"} className="nav-link">
                Auctions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <switch>
            <Route exact path={["/", "/auctions"]} component={AuctionsList} />
            <Route exact path ="/add" component={AddAuction} />
            <Route path="/auctions/:id" component={Auction} />
          </switch>

        </div>
      </div>
    );
  }
}

export default App;
