import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import Radium from 'radium';
import { Tabs,Tab } from 'material-ui/Tabs';

//import {white, blue} from 'material-ui/styles/colors';
import {white, blue} from '../styles/colors';
import typography from '../styles/typography';

class NavBar extends Component {
	
	//初始化变量
	constructor(props) {
		super(props);
		this.state = {tabIndex: '/'};
	}

	//React生命周期方法，在组件将要挂载的时候会执行该方法
	componentWillMount() {
		//console.log( 'will' );
		this.setState({
			tabIndex: this.getSelectedIndex()
		});
	}

	componentWillReceiveProps( nextProps ) {

		setTimeout( () => {
			this.setState({
				tabIndex: this.getSelectedIndex()
			});
		}, 0);
	}

	//React Router中的context.router.isAvtive()获取当前活跃的路径
	getSelectedIndex() {
		return this.context.router.isActive('/', true) ? '/' :
			this.context.router.isActive('/signup') ? '/signup' :
			this.context.router.isActive('/account') ? '/account' :
			this.context.router.isActive('/login') ? '/login' : '';
	}

	handleChange( value ) {
		this.context.router.push( value );
		this.setState( {tabIndex: value} );
	}

	render() {

		let styles = {
			root: {
				height: '64px',
				backgroundColor: blue,
				boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.24)'
			},
			tabs: {
				width: '390px',
				position: 'absolute',
				right: '60px',
				textTransform: 'uppercase',
				fontFamily: typography.fontFamily
			},
			tab: {
				height: '64px',
				color: white
			},
			inkBar: {
				height: '4px',
				marginTop: '-4px'
			}

		};

		let currentUser = Meteor.userId();
		return (

			<div style={styles.root}>
				<Tabs value={this.state.tabIndex} onChange={ this.handleChange.bind(this) }
				style={styles.tabs}
				inkBarStyle={styles.inkBar}
				tabItemContainerStyle={{ backgroundColor:'transparent' }}
				>
				    <Tab label='Home' value='/' style={styles.tab} />
				    <Tab 
				    	label = { currentUser ? 'Account' : 'Sign up' }
				    	value = { currentUser ? '/account' : '/signup' }
				    	style = {styles.tab} 
				    />
				    <Tab label={'Log In'} value='/login' style={styles.tab} />
				</Tabs>
			</div>

		);
	}
}

NavBar.contextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired	
};

export default Radium( NavBar );

