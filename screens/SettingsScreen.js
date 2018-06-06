import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class SettingsScreen extends Component {
  onButtonPress = () => {
    AsyncStorage.removeItem('fb_token', () => {
      this.props.navigation.navigate('welcome');
    });
  };

  render() {
    return (
      <View>
        <View>
          <Button large title="Log Out" backgroundColor="red" onPress={this.onButtonPress} />
        </View>
      </View>
    );
  }
}

export default connect(null)(SettingsScreen);
