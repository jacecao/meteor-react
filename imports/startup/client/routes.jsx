import React from 'react';
import { Router,Route,IndexRoute,browserHistory } from 'react-router';

import SignUp from '../../ui/SignUp.js';
import LogIn from '../../ui/LogIn.js';
import Home from '../../ui/Home.js';
import App from '../../ui/App.jsx';
import Account from '../../ui/Account.jsx';

export const renderRoutes = () => (
	<Router history = {browserHistory}>
		<Route path ='/' component={ App }>
			<IndexRoute component={Home} />
			<Route path='/signup' component={SignUp} />
			<Route path='/login' component={LogIn} />
			<Route path='/account' component={Account} />
		</Route>	
	</Router>
);

{/* 
//Router组件本身只是一个容器，真正的路由要通过Route组件定义。
//App 布局组件设置为父路由组件，其它子路由对应要嵌入到 
//App 中的各个组件。这样，路由嵌套和组件嵌套的映射关系
//是非常明确的。同时通过 IndexRoute 把 Home 
//组件设置为一个默认组件，也就是访问顶级路由 '/'的时候要显示的组件。
*/}