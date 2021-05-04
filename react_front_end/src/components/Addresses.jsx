import React, { Component } from "react";
import AddressesServices from "../services/AddressesDataService";

export default class Addresses extends Component {
	constructor(props) {
		super(props);
		this.selectRandom5 = this.selectRandom5.bind(this);

		this.state = {
			LineOne: "line one",
			SuitNumber: "Suit Number",
			City: "City",
			State: "State",
			PostalCode: "Postal code",
			IsAtive: 10,
			Lat: 10,
			Long: 10,
		};
	}

	selectRandom5() {
		AddressesServices.selectRandom5()
			.then((response) => {
				console.log(
					"response.data::::",
					response.data.items
				);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		return (
			<button
				onClick={this.selectRandom5}
				className="btn btn-success"
			>
				Submit
			</button>
		);
	}
}
