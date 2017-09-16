import _ from 'lodash';
import React from 'react';

export default class Work extends React.Component {
    renderWork() {
	return
    }

    render() {
	console.log(this.props.work);
	return (
	    <div>
		<h2>{this.props.work.title}</h2>
		<h3>by {this.props.work.author}</h3>
	    </div>
	);
    }
}
