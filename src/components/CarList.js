import React, { Component } from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'
import Car from './Car'
import SearchBar from './SearchBar'
import './CarDetails.css'

class CarList extends Component {
	state = {
		cars: [],
		searchCars: [],
		error: null
	}

	filterCars(event) {
		const result = this.state.cars.filter(car => {
			return car.make.toLowerCase().search(
				event.target.value.toLowerCase()) !== -1
		})

		
		if (result.length) {
			this.setState({ cars: result })
		} else {
			this.setState({ cars: this.state.searchCars })
		}

	}

	render() {
		const { cars, error } =  this.state

		if (error) {
			return <div>{this.state.error}</div>
		}

		return (
			<div>
				<input 
					type="text"
					placeholder="Search for..."
					onChange= {this.filterCars.bind(this)} />
				<Car carlist={ cars } />	
			</div>
		);
	}

	onLoad = (data, error) => {
		if (data) {
			const cars = data.cars;
			this.setState({ cars });
			this.setState({ searchCars: cars })
		} else {
			this.setState({ error });
		}
	};


	componentDidMount() {
		// 1. Load the JavaScript client library.
		this.initClient = this.initClient.bind(this)
		window.gapi.load("client", this.initClient)
	}


	initClient() {
		// 2. Initialize the JavaScript client library.
		window.gapi.client
			.init({
				apiKey: config.apiKey,
				// Your API key will be automatically added to the Discovery Document URLs.
				discoveryDocs: config.discoveryDocs
				})
			.then(() => {
				// 3. Initialize and make the API request.
				load(this.onLoad);
			});
	}
}


export default CarList;