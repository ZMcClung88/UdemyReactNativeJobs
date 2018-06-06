// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { Button } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { clearLikedJobs } from '../actions';
//
// class SettingsScreen extends Component {
//   onButtonPress = () => {
//     AsyncStorage.removeItem('fb_token', () => {
//       this.props.navigation.navigate('welcome');
//     });
//   };
//
//   render() {
//     return (
//       <View>
//         <View>
//           <Button
//             title="Reset Liked Jobs"
//             large
//             icon={{ name: 'delete -forever' }}
//             backgroundColor="#F44336"
//             onPress={this.props.clearLikedJobs}
//           />
//           <Button
//             large
//             title="Log Out"
//             icon={{ name: 'delete -forever' }}
//             backgroundColor="red"
//             onPress={this.onButtonPress}
//           />
//         </View>
//       </View>
//     );
//   }
// }
//
// export default connect(null, { clearLikedJobs })(SettingsScreen);
//

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  };
  render() {
    return (
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Reset Liked Jobs"
            large
            icon={{ name: 'delete-forever' }}
            backgroundColor="#F44336"
            onPress={this.props.clearLikedJobs}
          />
        </View>
        <View>
          <Button
            large
            title="Log Out"
            icon={{ name: 'delete-forever' }}
            backgroundColor="red"
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

styles = {
  buttonContainer: {
    justifyContent: 'space-around',
    // alignItems: 'center',
    flex: 1
  }
};

export default connect(null, { clearLikedJobs })(SettingsScreen);
