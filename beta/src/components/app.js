import React from 'react';
import Book from './book';

var work = {
    title: 'Lord of the Rings: Return of the King',
    author: 'J.R.R. Tolkien'
}

export default class App extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    work
	};
    }

    render() {
        return (
            <div>
              <Work work={this.state.work}/>
            </div>
        );
    }
}
