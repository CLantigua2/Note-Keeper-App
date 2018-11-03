import React from 'react';

const Note = (props) => {
	return (
		<div className="col-md-6">
			<div className="card mb-4 shadow-sm">
				<div className="card-body">
					<h1>{props.title}</h1>
					<div className="card-text">
						<p>{props.textBody}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Note;
