import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import NavBar from './shared/NavBar.jsx';

class App extends Component {
	
	getChildContext() {
		return {
			muiTheme : getMuiTheme()
		};
	}

	render() {
		return(
			<div>
				<NavBar />
				{ this.props.children }
			</div>
		);
	}
}

App.childContextTypes = {
	muiTheme : React.PropTypes.object.isRequired
};

export default App;


//布局组件 App 
//后续会作为嵌套路由中的父组件，它将包裹其它子组件，
//{ this.props.children } 未来会替换为各个具体的子组件。