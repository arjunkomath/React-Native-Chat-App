var React = require('react-native');
var {
	View,
	Text,
	StyleSheet
} = React;

var sendbird = require('sendbird');
var GiftedMessenger = require('react-native-gifted-messenger');
var {Dimensions} = React;

var Chat = React.createClass({

	getInitialState: function() {
		return {
			messages: [],
			messageList: []
		};
	},

	componentWillMount: function() {
		sendbird.events.onMessageReceived = (m) => {
			var _m = {};
			_m.text = m.message;
			_m.name = m.user.name;
			_m.image = {uri: m.user.image};
			_m.position = 'left';
			_m.date = new Date(m.sts);
			this._GiftedMessenger.appendMessage(_m);
			this.setState({
				messageList: this.state.messageList.concat([m]),
				messages: this.state.messageList.concat([_m]),
			});
		};
		this._getMessages();
	},

	_getMessages: function() {
		sendbird.getMessageLoadMore({
			limit: 100,
			successFunc: (data) => {
				var _messageList = [];
				data.messages.reverse().forEach(function(msg, index){
					if(sendbird.isMessage(msg.cmd)) {
						_messageList.push(msg.payload);
					}
				});
				var messages = [];
				this.state.messageList.map(function(m) {
					var _m = {};
					_m.text = m.message;
					_m.name = m.user.name;
					_m.image = {uri: m.user.image};
					_m.position = 'left';
					_m.date = new Date(m.sts);
					messages.push(_m);
				});
				this.setState({ 
					messageList: _messageList.concat(this.state.messageList),
					messages: messages.concat(this.state.messages),
				});
			},
			errorFunc: (status, error) => {
				console.log(status, error);
			}
		});
	},

	getMessages: function() {
		console.log(this.state.messages);
		return this.state.messages;
	},

	handleSend: function(message = {}, rowID = null) {
		console.log(message);
		sendbird.message(message.text);
	},

	handleReceive: function() {
		this._GiftedMessenger.appendMessage({
			text: 'Received message', 
			name: 'Friend', 
			image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
			position: 'left', 
			date: new Date(),
		});
	},

	render: function() {
		return (
			<GiftedMessenger
			ref={(c) => this._GiftedMessenger = c}

			messages={this.getMessages()}
			handleSend={this.handleSend}
			maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar

			styles={{
				bubbleLeft: {
					backgroundColor: '#e6e6eb',
					marginRight: 70,
				},
				bubbleRight: {
					backgroundColor: '#007aff',
					marginLeft: 70,
				},
			}}
			/>
			);
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#6E5BAA'
	}
});

module.exports = Chat;