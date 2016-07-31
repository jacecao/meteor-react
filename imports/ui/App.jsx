import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Radium,{ StyleRoot } from 'radium';

import AppBar from 'material-ui/AppBar';

/*
**虽然 Meteor.userId() 这个可变的 Meteor 数据已经赋值给了 
**currentUser这个变量，我们希望通过 Meteor.userId() 的变化改变 Tab
**组件的状态。 但是，这会儿 Tab 组件肯定是不会自动渲染的，
**因为让一个 React 组件基本有两种方式：一种是在组件内部直接改变它的 
**state 状态值；另外一种方式就是我们使用这个组件的时候，若传给它的 
**prop 属性值发生了变化，这个组件也会重新渲染一下。我们这里就通过传
**递属性的方式改变组件状态，在 NavBar 的父组件 App 组件中给 NavBar 
**组件添加一个属性 currentUser

**在 React 组件中正确的使用 Meteor 随动数据，首先要安装一个 npm 包
** react-addons-pure-render-mixin
**再安装一个 Atmosphere 包 react-meteor-data，它依赖上面这个包
** 安装方法 meteor add react-meteor-data 
**这个 Atmosphere 包提供了一个 createContainer 方法，通过这个方法可以获取
**Meteor 的随动数据，并通过 React props 把获取的数据传递给 React 组件。
*/

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';

import NavBar from './shared/NavBar.jsx';
import AppDrawer from './shared/AppDrawer.jsx';
import LogOutMenu from './auth/LogOutMenu.jsx';

class App extends Component {
	
	getChildContext() {
		return {
			muiTheme : getMuiTheme()
		};
	}

	componentWillMount() {
		let setNavBarState = () => {
			this.setState({renderNavBar:window.innerWidth > 700});
		};
		setNavBarState();
		window.onresize = setNavBarState;
	}

	getStyles(){
		return {
			root: {
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
				minHeight: '100vh'
			}
		};
	}

	render() {
		const styles = this.getStyles();
		return(
			<StyleRoot>
				<div style={ styles.root }>
					{ 
						this.state.renderNavBar ? 
						<NavBar currentUser={this.props.currentUser} userInfo={this.props.userInfo} /> : 
						( this.props.currentUser ? this.getLoginAppBar() : this.getAppBar() )
					}
					<AppDrawer ref='drawer' currentUser={this.props.currentUser} />
					{ this.props.children }
				</div>
			</StyleRoot>
		);
	}

	handleTouchTap() {
		this.refs.drawer.handleToggle();
	}

	getAppBar() {
	    return (
	      <AppBar onLeftIconButtonTouchTap = { this.handleTouchTap.bind(this) } style={ {flexShrink: 0} } />
	    );
	}

	getLoginAppBar() {
	    return (
	     	<AppBar 
	      		onLeftIconButtonTouchTap = { this.handleTouchTap.bind(this) }
	        	style = { {flexShrink: 0} }
	        	iconStyleRight = { {marginTop: 0} }
	        	iconElementRight = { <LogOutMenu username={this.props.userInfo ? this.props.userInfo.username : ''}/> }
	     	/>
	    );
	}

}

App.childContextTypes = {
	muiTheme : React.PropTypes.object.isRequired
};

App.propTypes = {
	currentUser: React.PropTypes.string
};


export default createContainer( () => {
	return {
		currentUser: Meteor.userId(),
		userInfo: Meteor.user()
	};
}, Radium( App ) );


//布局组件 App 
//后续会作为嵌套路由中的父组件，它将包裹其它子组件，
//{ this.props.children } 未来会替换为各个具体的子组件。