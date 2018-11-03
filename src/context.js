import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searchTerm: action.params
			};
		case 'ADD_NOTE':
			return {
				...state,
				notes: [ ...action.payload ]
			};
		case 'GET_ALL_NOTES':
			return {
				...state,
				notes: action.payload
			};
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		notes: [],
		noteId: '',
		isChecked: false,
		searchTerm: '',
		dispatch: (action) => this.setState((state) => reducer(state, action))
	};

	componentDidMount() {
		axios
			.get('https://fe-notes.herokuapp.com/note/get/all')
			.then((res) => {
				this.setState({ notes: res.data });
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
