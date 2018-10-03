import React, { Component } from 'react'
import CarDetails from './CarDetails'

class Car extends Component {

	render() {
		return (
			<ul>
				{this.props.carlist
					.sort((a,b) => a.year - b.year)
					.map((car, i) => (
						<CarDetails 
							year={ car.year } 
							make={ car.make }
							model={ car.model } />
				
				))}
			</ul>
		)
	}
}

export default Car