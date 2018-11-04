import React from 'react';
import { connectStore } from '../../context';
import Spinner from '../layout/Spinner';
import Note from './Note';

class NoteContainer extends React.Component {
	state = {
		title: this.props.title,
		text: this.props.textBody
	};

	render() {
		const { notes, showMenu, getAllNotes } = this.props;

		if (notes === undefined || notes.length === 0) {
			return <Spinner />;
		} else {
			return (
				<React.Fragment>
					<h3 className="text-center mb-4">Your Notes</h3>
					<div className="row">
						{notes.map((note) => (
							<Note
								handleSubmit={this.props.handleSubmit}
								key={note._id}
								title={note.title}
								id={note._id}
								textBody={note.textBody}
								showMenu={showMenu}
								getAllNotes={getAllNotes}
							/>
						))}
					</div>
				</React.Fragment>
			);
		}
	}
}

export default connectStore(NoteContainer);
