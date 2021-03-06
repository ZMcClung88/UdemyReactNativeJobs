import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';

import registerForNotifications from './services/push_notification';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok.' }]);
      }
    });
  }

  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: WelcomeScreen,
        auth: AuthScreen,
        main: {
          screen: createBottomTabNavigator(
            {
              map: MapScreen,
              deck: DeckScreen,
              review: {
                screen: createStackNavigator({
                  review: ReviewScreen,
                  settings: SettingsScreen
                })
              }
            },
            {
              tabBarPosition: 'bottom',
              lazyLoad: true,
              tabBarOptions: {
                labelStyle: { fontSize: 12 }
              }
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false
      }
    );
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
