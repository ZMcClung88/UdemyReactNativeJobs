import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -111.891047,
      latitude: 40.760779,
      longitudeDelta: 1,
      latitudeDelta: 1
    }
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView region={this.state.region} style={{ flex: 1 }} onRegionChangeComplete={this.onRegionChangeComplete} />
      </View>
    );
  }
}

export default MapScreen;
