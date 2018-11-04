import axios from 'axios';
//holds all functions/actions

// must be exported as regular functions to work
export function getAllNotes() {
	axios
		.get('https://fe-notes.herokuapp.com/note/get/all')
		.then((res) => {
			this.setState({ notes: res.data });
		})
		.catch((err) => console.log(err));
}

export function getNoteId(id) {
	axios
		.get(`https://fe-notes.herokuapp.com/note/get/${id}`)
		.then((res) => {
			this.setState({ noteId: res.data });
		})
		.catch((err) => console.log(err));
}

export function handleChange(e) {
	this.setState({ [e.target.name]: e.target.value });
}

export function filterSearch() {
	this.getAllNotes();
	const { notes, searchTitle } = this.state;
	return searchTitle
		? notes.filter((note) => note.title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1)
		: notes;
}

export function addNote(e) {
	e.preventDefault();
	const { title, textBody } = this.state;
	if (title === '' && textBody === '') {
		alert('Please edit at least one of the fields');
	} else {
		axios.post('https://fe-notes.herokuapp.com/note/create', { title, textBody });
	}
}

export function handleSubmit(e) {
	e.preventDefault();
	return ({ id, title, text }) => {
		axios
			.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, {
				title,
				textBody: text
			})
			.then(() => {
				this.getAllNotes();
			})
			.catch((err) => console.log(err));
	};
}
