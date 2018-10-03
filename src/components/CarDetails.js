import React, { Component } from 'react'

class CarDetails extends Component {
	render () {
		return (
				<li className="cars-info">
					<p>{ this.props.year }</p>
					<p>{ this.props.make }</p>
					<p>{ this.props.model }</p>
				</li>
		)
	}
}

export default CarDetails