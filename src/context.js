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
		searchTitle: '',
		title: '',
		textBody: '',
		dispatch: (action) => this.setState((state) => reducer(state, action))
	};

	componentDidMount() {
		this.getAllNotes();
	}

	getAllNotes = () => {
		setTimeout(() => {
			axios
				.get('https://fe-notes.herokuapp.com/note/get/all')
				.then((res) => {
					this.setState({ notes: res.data });
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}, 5000);
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	filterSearch = () => {
		this.getAllNotes();
		const { notes, searchTitle } = this.state;
		return searchTitle
			? notes.filter((note) => note.title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1)
			: notes;
	};

	addNote = (e) => {
		e.preventDefault();
		const { title, textBody } = this.state;
		if (title === '' && textBody === '') {
			alert('Please edit at least one of the fields');
		} else {
			axios.post('https://fe-notes.herokuapp.com/note/create', { title, textBody });
		}
	};

	render() {
		const { notes, searchTitle } = this.state;
		return (
			<Context.Provider
				value={{
					notes: notes,
					searchTitle: searchTitle,
					handleChange: this.handleChange,
					addNote: this.addNote,
					title: this.title,
					textBody: this.textBody
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
