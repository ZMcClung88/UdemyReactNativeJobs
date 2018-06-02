import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [{ text: 'Welcome to JobApp' }, { text: 'Set your location, then swipe away' }];

class WelcomeSceen extends Component {
  render() {
    return <Slides data={SLIDE_DATA} />;
  }
}

export default WelcomeSceen;
