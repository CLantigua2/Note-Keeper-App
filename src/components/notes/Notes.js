import React from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Note from './Note';

const NoteContainer = () => {
	return (
		<div>
			<Consumer>
				{(value) => {
					const { notes } = value;
					if (notes === undefined || notes.length === 0) {
						return <Spinner />;
					} else {
						return (
							<React.Fragment>
								<h3 className="text-center mb-4">Your Notes</h3>
								<div className="row">
									{notes.map((note) => (
										<Note key={note._id} title={note.title} textBody={note.textBody} />
									))}
								</div>
							</React.Fragment>
						);
					}
				}}
			</Consumer>
		</div>
	);
};

export default NoteContainer;
