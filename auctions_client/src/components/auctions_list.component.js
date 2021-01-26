import React, { Component } from "react";
import AuctionDataService from "../services/auction.service";
import { Link } from "react-router-dom";

export default class AuctionsList extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveAuctions = this.retrieveAuctions.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAuction = this.setActiveAuction.bind(this);
        this.removeAllAuctions = this.removeAllAuctions.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            auctions: [],
            currentAuction: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveAuctions();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveAuctions() {
        console.log("To retrieve data")
        AuctionDataService.getAll()
            .then(response => {
                this.setState({
                    auctions: response.data
                });
                console.log("Im logging data");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveAuctions();
        this.setState({
            currentAuction: null,
            currentIndex: -1
        });
    }

    setActiveAuction(auction, index) {
        this.setState({
            currentAuction: auction,
            currentIndex: index
        });
    }

    removeAllAuctions() {
        AuctionDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch( e => {
            console.log(e);
        });
    }

    searchTitle() {
        AuctionDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                auctions: response.data
            });
            console.log(response.data);
        })
        .catch( e => {
            console.log(e);
        });
    }

    render() {

        const { searchTitle, auctions, currentAuction, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Auctions List</h4>
                    <ul className="list-group">
                    {auctions &&
                        auctions.map((auction, index) => (
                            <li 
                                className={
                                    "list-group-item " +
                                    ( index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveAuction(auction, index)}
                                key={index}
                            >
                                {auction.title}
                            </li>
                        ))
                    }
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllAuctions}
                    >
                        Remove All
                    </button>
            </div>
            <div className="col-md-6">
                { currentAuction ? (
                    <div>
                        <h4>Auction</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentAuction.title}
                        </div>
                        <div>
                            <label>
                                <strong>Start Time:</strong>
                            </label>{ " "}
                            {currentAuction.start_time}
                        </div>
                        <div>
                            <label>
                                <strong>End Time:</strong>
                            </label>{ " "}
                            {currentAuction.end_time}
                        </div>
                        <Link
                            to={"/auctions/" + currentAuction.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p> Please click on an Auction...</p>
                    </div>
                )}
            </div>
        </div>
        );
    }
}