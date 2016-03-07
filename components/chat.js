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
			if(m.user.guest_id == this.props.user.guest_id)
				_m.position = 'right';
			_m.date = new Date(m.sts);
			this.setState({
				messageList: this.state.messageList.concat([m]),
				messages: this.state.messages.concat([_m]),
			});
		};
		this._getMessages();
	},

	_getMessages: function() {
		var that = this;
		sendbird.getMessageLoadMore({
			limit: 100,
			successFunc: (data) => {
				var _messageList = [];
				var messages = [];
				data.messages.reverse().forEach(function(msg, index){
					if(sendbird.isMessage(msg.cmd)) {
						_messageList.push(msg.payload);
						var m = msg.payload;
						var _m = {};
						_m.text = m.message;
						_m.name = m.user.name;
						_m.image = {uri: m.user.image};
						_m.position = 'left';
						if(m.user.guest_id == that.props.user.guest_id)
							_m.position = 'right';
						_m.date = new Date(m.sts);
						messages.push(_m);
					}
				});
				this.setState({ 
					messageList: _messageList.concat(this.state.messageList),
					messages: messages.concat(this.state.messages)
				});
			},
			errorFunc: (status, error) => {
				console.log(status, error);
			}
		});
	},

	getMessages: function() {
		return this.state.messages;
	},

	handleSend: function(message = {}, rowID = null) {
		console.log(message);
		sendbird.message(message.text);
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