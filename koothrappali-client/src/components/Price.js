import React, { Component } from 'react';

class Price extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.item) {
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return (
				<h5 className="text-success .sserif">
					Estimated Price
					<span className="badge sserif"></span>
					:	$ {Math.round(this.props.item.data * 100) / 100}
					&ensp;
				[{months[new Date().getMonth()]}]
	
				</h5>)
		}
	}
}
export default Price;
