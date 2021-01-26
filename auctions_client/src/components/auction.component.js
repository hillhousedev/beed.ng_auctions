import React, { Component } from "react";
import AuctionDataService from "../services/auction.service";

export default class Auction extends Component  {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.getAuction = this.getAuction.bind(this);
        

        this.state = {
            currentAuction: {
                id: null,
                title: "",
                start_time: "",
                end_time: ""
            },

            message: ""
        };
    }

    componentDidMount() {
        this.getAuction(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return{
                currentAuction: {
                    ...prevState.currentAuction,
                    title: title
                }
            };
        });
    }

    onChangeStartTime(e) {
        const start_time = e.target.value;

        this.setState(prevState => ({
            currentAuction: {
                ...prevState.currentAuction,
                start_time: start_time
            }
        }));
    }

    onChangeEndTime(e) {
        const end_time = e.target.value;

        this.setState(prevState => ({
            currentAuction: {
                ...prevState.currentAuction,
                end_time: end_time
            }
        }));
    }

    getAuction(id) {
        AuctionDataService.get(id)
        .then(response => {
            this.setState({
                currentAuction: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {

        const { currentAuction } = this.state;

        return (
            <div>
                {currentAuction ? (
                    <div className="edit-form">
                        <h4>Auction</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentAuction.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="start_time">Start Time</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="start_time"
                                    value={currentAuction.start_time}
                                    onChange={this.onChangeStartTime}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="end_time">End Time</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="end_time"
                                    value={currentAuction.end_time}
                                    onChange={this.onChangeEndTime}
                                />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Auction...</p>
                    </div>
                
                
                )}
                

            </div>
            
        );
    }

}