import React, { Component } from 'react';

import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Radium from 'radium';

import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'

import isEmpty from 'lodash/fp/isEmpty';
import UserInfo from './user/UserInfo.jsx';
import '../api/users.js';

class Account extends Component {
	
	constructor(props) {
		super( props );
		this.state = {
			user: {},
			//这里主要是避免重复提交，搜索按钮初始状态为活跃状态
			active: true
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		//搜索按钮在数据请求过程中禁用
		this.setState({ active: false });
		const username = this.refs.username.getValue();
		//ES6中允许在模板字符串中添加变量，模板字符串必须使用反引号标记，变量名必须要写在${}中
		const url = `https://api.github.com/users/${username}`;

		HTTP.call('get', url, (error, res) => {
			if(error){
				console.log(error);
			}else{
				this.setState({ 
					user: JSON.parse(res.content),
					//搜索按钮再次激活
					active: true
				});
			}
		});
	}

	handleClick(e) {
		e.preventDefault();
		Meteor.call('update/user', this.state.user, (error) =>{
			if( error ){
				console.log(error);
				return;
			}
			this.context.router.push('/chat');
		});
	}

	render() {
		
		let styles = {
			root : {
				flexGrow: 1,
				overflowY: 'scroll',
				paddingTop: '64px',
				paddingLeft: '16px',
				paddingRight: '16px'
			},
			card : {
				maxWidth: '700px',
				margin: '20px auto',
				padding: '20px',
			}
		};

		let GithubInfo;
		let currentUser = this.props.currentUser;
		if( !isEmpty(this.state.user) ) {
			GithubInfo = (
				<div>
					<UserInfo userInfo = { this.state.user } />
					<RaisedButton
						style = {{display: 'block',margin:'30px auto 0',width:'180px'}}
						secondary = {true}
						label = 'save'
						onClick = { this.handleClick.bind(this) }
					/>
				</div>
			);
		}else if( currentUser && currentUser.avatar_url ){
			GithubInfo = (<UserInfo userInfo = { this.props.currentUser } />);
		}

		return (
			<div style = {styles.root} >
				<Card style = {styles.card}>
					<form onSubmit = { this.handleSubmit.bind(this) } >
						<TextField 
							hintText = 'Github Account' 
							ref = 'username' 
						/>
						<FlatButton 
							type = 'submit'
							primary = { this.state.active }
							disabled={ !this.state.active }
							label = 'search github'
						/>
					</form>
					{ GithubInfo }
				</Card>
			</div>
		);
	}
}

Account.contextTypes = { 
	router: React.PropTypes.object.isRequired 
};

export default createContainer( () => {
	Meteor.subscribe('userInfo');
	return { currentUser: Meteor.user()};
}, Radium( Account ) );