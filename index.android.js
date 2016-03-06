'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Navigator,
} from 'react-native';

var Login = require('./components/login');
var Channels = require('./components/channels');
var Chat = require('./components/chat');

var ROUTES = {
	login: Login,
	channels: Channels,
	chat: Chat
};

class chat_app extends Component {

	renderScene(route, navigator) {
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />;
	}

	render() {
		return (
			<Navigator
			style={ styles.container }
			initialRoute={ {name: 'login'} }
			renderScene={this.renderScene}
			configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
			/>
			);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

AppRegistry.registerComponent('chat_app', () => chat_app);
