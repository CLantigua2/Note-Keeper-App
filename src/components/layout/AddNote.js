import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { Consumer } from '../../context';

function TabContainer(props) {
	const { children, dir } = props;

	return (
		<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
		position: 'relative',
		minHeight: 200
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	fabGreen: {
		color: theme.palette.common.white,
		backgroundColor: green[500]
	},
	title: {
		marginLeft: '25px',
		paddingTop: '10px'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	}
});

class FloatingActionButtonZoom extends React.Component {
	state = {
		value: 0,
		title: '',
		textBody: ''
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	formHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	AddNote = (dispatch, e) => {
		e.preventDefault();
		const { title, textBody } = this.state;
		axios
			.post('https://fe-notes.herokuapp.com/note/create', { title, textBody })
			.then((res) => {
				console.log(res);
				dispatch({
					type: 'ADD_TASK',
					payload: res.data
				}).then(
					axios.get('https://fe-notes.herokuapp.com/note/get/all').then((res) => {
						dispatch({
							type: 'GET_ALL_NOTES',
							payload: res.data
						});
					})
				);
				this.setState({ title: '', textBody: '' });
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { classes, theme } = this.props;
		const transitionDuration = {
			enter: theme.transitions.duration.enteringScreen,
			exit: theme.transitions.duration.leavingScreen
		};

		const fabs = [
			{
				color: 'primary',
				className: classes.fab,
				icon: <AddIcon />
			},
			{
				color: 'secondary',
				className: classes.fab,
				icon: <EditIcon />
			},
			{
				color: 'inherit',
				className: classNames(classes.fab, classes.fabGreen),
				icon: <UpIcon />
			}
		];

		// console.log(this.state);

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className={classes.root}>
							<AppBar position="static" color="default">
								<h4 className={classes.title}>Create a note</h4>

								<SwipeableViews
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={this.state.value}
									onChangeIndex={this.handleChangeIndex}
								>
									<TabContainer dir={theme.direction}>
										<form
											onSubmit={this.AddNote.bind(this, dispatch)}
											className={classes.container}
											noValidate
											autoComplete="off"
											required
										>
											<TextField
												id="standard-required"
												type="text"
												className="form-control form-control-lg"
												label="Add A Note Title..."
												name="title"
												margin="normal"
												value={this.state.title}
												onChange={this.formHandler}
											/>
											<TextField
												id="standard-required"
												type="text"
												className="form-control form-control-lg"
												label="What On Your Mind..."
												name="textBody"
												margin="normal"
												value={this.state.textBody}
												onChange={this.formHandler}
											/>
											{fabs.map((fab, index) => (
												<Zoom
													key={fab.color}
													in={this.state.value === index}
													timeout={transitionDuration}
													style={{
														transitionDelay: `${this.state.value === index
															? transitionDuration.exit
															: 0}ms`
													}}
													unmountOnExit
												>
													<Button
														position="static"
														variant="fab"
														className={fab.className}
														color={fab.color}
														type="submit"
													>
														{fab.icon}
													</Button>
												</Zoom>
											))}
										</form>
									</TabContainer>
								</SwipeableViews>
							</AppBar>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

FloatingActionButtonZoom.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);