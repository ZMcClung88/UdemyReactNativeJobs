import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';
import Geocode from 'react-geocode';

// Geocode.setApiKey('AIzaSyAXdQzGlk6GVvuFWswOFxzWRwDg0MhvMTI')

class DeckScreen extends Component {
  renderCard(job) {
    Geocode.fromAddress(job.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

    const initialRegion = {
      // longitude: lng,
      // latitude: lat,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          />
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          {/* <Text>{job.created_at}</Text> */}
        </View>
        <Text>{job.description}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return <Card title="No more jobs" />;
  };

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

function mapStateToProps({ jobs }) {
  // console.log('jobs', { jobs });
  return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
