import React, { Component } from 'react';
import Radium from 'radium';
import { Tabs,Tab } from 'material-ui/Tabs';

class NavBar extends Component {
	
	//初始化变量
	constructor(props) {
		super(props);
		this.state = {tabIndex: '/'};
	}

	//React生命周期方法，在组件将要挂载的时候会执行该方法
	componentWillMount() {
		this.setState({
			tabIndex: this.getSelectedIndex()
		});
	}

	//React Router中的context.router.isAvtive()获取当前活跃的路径
	getSelectedIndex() {
		return this.context.router.isActive('/', true) ? '/' :
			this.context.router.isActive('/signup') ? '/signup' :
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
				background: '#00bcd4',
				boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.24)'
			},
			tabs: {
				width: '390px',
				position: 'absolute',
				right: '60px',
				textTransform: 'uppercase'
			},
			tab: {
				height: '64px',
				color: '#fff'
			},
			inkBar: {
				height: '4px',
				marginTop: '-4px'
			}

		};

		return (

			<div style={styles.root}>
				<Tabs value={this.state.tabIndex} onChange={ this.handleChange.bind(this) }
				style={styles.tabs}
				inkBarStyle={styles.inkBar}
				tabItemContainerStyle={{ backgroundColor:'transparent' }}
				>
				    <Tab label='Home' value='/' style={styles.tab} />
				    <Tab label='Sign Up' value='/signup' style={styles.tab} />
				    <Tab label='Log In' value='/login' style={styles.tab} />
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

