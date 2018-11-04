import React from 'react';
import './App.css';
import { Provider } from './context';
import { Route } from 'react-router-dom';
import Notes from './components/notes/Notes.js';
import Sidebar from './components/layout/Sidebar';
import AddNote from './components/layout/AddNote';

import styled from 'styled-components';

const App = () => {
	return (
		<Provider>
			{/* <Route path="*" render={() => <SidebarContainer />} /> */}
			<Route path="*" component={Sidebar} />
			<StyledContainer className="container">
				<Route exact path="/" component={AddNote} />
				<Route exact path="/" component={Notes} />
				{/* <Route path="/create-new-note" component={NewNote} />
			<Route path="/:id/edit-note" component={EditNote} />
    <Route path="/:id/note" component={FullNote} /> */}
			</StyledContainer>
		</Provider>
	);
};

export default App;

const StyledContainer = styled.div`
	position: relative;
	bottom: 20em;
	padding-left: 4em;
`;
