var React = require('react-native');
var {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet
} = React;

var sendbird = require('sendbird');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			username: 'Arjun'
		};
	},

	onPress: function() {
		sendbird.init({
			app_id: '68DDBFD9-B5C5-417A-AF8D-3674456BCB26',
			guest_id: this.state.username,
			user_name: this.state.username,
			image_url: "http://lorempixel.com/200/200/",
			access_token: "",
			successFunc: (data) => {
				console.log('success');
				this.props.navigator.push({ name: 'channels' });
			},
			errorFunc: (status, error) => {
				this.setState({username: ''});
			}
		});
	},

	render: function() {
		return (
			<View style={styles.container}>
			<View style={styles.loginContainer}>
			<TextInput
			style={styles.input}
			value={this.state.username}
			onChangeText={(text) => this.setState({username: text})}
			placeholder={'Enter User Nickname'}
			maxLength={12}
			multiline={false}
			/>

			<TouchableHighlight
			style={styles.button}
			underlayColor={'#328FE6'}
			onPress={this.onPress}
			>
			<Text style={styles.label}>LOGIN</Text>
			</TouchableHighlight>
			</View>
			</View>
			);
	},

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#6E5BAA'
	},
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: 250,
		color: '#555555',
		padding: 10,
		height: 50,
		borderColor: '#32C5E6',
		borderWidth: 1,
		borderRadius: 4,
		alignSelf: 'center',
		backgroundColor: '#ffffff'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#328FE6',
		padding: 10,
		marginTop: 10,
		backgroundColor: '#32c5e6'
	},
	label: {
		width: 230,
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600',
		color: '#ffffff'
	}
});