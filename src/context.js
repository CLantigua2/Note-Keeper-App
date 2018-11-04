import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export const reducer = (state, action) => {
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
		case 'EDIT_NOTE':
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
		setTimeout(() => {
			this.getAllNotes();
		}, 1000);
	}

	getAllNotes = () => {
		axios
			.get('https://fe-notes.herokuapp.com/note/get/all')
			.then((res) => {
				this.setState({ notes: res.data });
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	};

	getNoteId = (id) => {
		axios
			.get(`https://fe-notes.herokuapp.com/note/get/${id}`)
			.then((res) => {
				this.setState({ noteId: res.data });
			})
			.catch((err) => console.log(err));
	};

	editNote = ({ title, text, id }) => (dispatch) => {
		axios
			.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, {
				title,
				textBody: text
			})
			.then((res) => {
				console.log(res);
				dispatch(this.getAllNotes());
			})
			.catch((err) => console.log(err));
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.editNote({ ...this.state, id: this.state.notes._id });
	};

	render() {
		const { notes, searchTitle } = this.state;
		// console.log(this.state);
		return (
			<Context.Provider
				value={{
					editNote: this.editNote,
					notes,
					searchTitle,
					handleChange: this.handleChange,
					addNote: this.addNote,
					title: this.title,
					textBody: this.textBody,
					getAllNotes: this.getAllNotes
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const connectStore = (DependentComponent) => {
	return class extends Component {
		render() {
			return <Consumer>{(context) => <DependentComponent {...context} />}</Consumer>;
		}
	};
};

export const Consumer = Context.Consumer;
