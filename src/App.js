import React from 'react';
import './App.css';
import { Provider } from './context';
import { Route } from 'react-router-dom';
import Notes from './components/notes/Notes.js';
import Sidebar from './components/layout/Sidebar';
const App = () => {
	return (
		<Provider>
			{/* <Route path="*" render={() => <SidebarContainer />} /> */}
			<Route path="*" component={Sidebar} />
			<div className="container">
				<Route exact path="/" component={Notes} />
			</div>
			{/* <Route path="/create-new-note" component={NewNote} />
			<Route path="/:id/edit-note" component={EditNote} />
    <Route path="/:id/note" component={FullNote} /> */}
		</Provider>
	);
};

export default App;
