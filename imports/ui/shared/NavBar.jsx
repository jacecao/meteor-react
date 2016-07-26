import React, { Component } from 'react';
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
		return (
		  <Tabs value={this.state.tabIndex} onChange={ this.handleChange.bind(this) }>
		      <Tab label='Home' value='/' />
		      <Tab label='Sign Up' value='/signup' />
		      <Tab label='Log In' value='/login' />
		  </Tabs>
		);
	}
}

NavBar.contextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired	
};

export default NavBar;

