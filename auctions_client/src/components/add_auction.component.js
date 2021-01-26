import React, {Component} from "react";
import AuctionDataService from "../services/auction.service";

export default class AddAuction extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeStart_Time = this.onChangeStart_Time.bind(this);
        this.onChangeEnd_Time = this.onChangeEnd_Time.bind(this);
        this.saveAuction = this.saveAuction.bind(this);
        this.newAuction = this.newAuction.bind(this);

        this.state = {
            id: null,
            title: "",
            start_Time: "",
            end_time: "",

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });

    }

    onChangeStart_Time(e) {
        this.setState({
            start_Time: e.target.value
        });
    }

    onChangeEnd_Time(e) {
        this.setState ({
            end_time: e.target.value
        });
    }

    saveAuction() {

        var data = {
            title: this.state.title,
            start_time: this.state.start_Time,
            end_time: this.state.end_time
        };

        console.log("create called");
        AuctionDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    start_Time: response.data.start_Time,
                    end_time: response.data.end_time,

                    submitted: true
                });
                console.log("About submitting data");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newAuction() {
        this.setState({
            id: null,
            title: "",
            start_Time: "",
            end_time: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newAuction}>
                            Add
                        </button>
                )}
            </div>
        ) : (
            <div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        name="title"
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="start_time">Start Time</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="start_time"
                        required
                        value={this.state.start_Time}
                        onChange={this.onChangeStart_Time}
                        name="start_time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_time">Start Time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="start_time"
                        required
                        value={this.state.start_Time}
                        onChange={this.onChangeStart_Time}
                        name="start_time"
                    />
                </div>

                <button onClick={this.saveAuction} className="btn btn-success">
                    Submit
                </button>
            </div>
        )}
    </div>
        );
    }
}

