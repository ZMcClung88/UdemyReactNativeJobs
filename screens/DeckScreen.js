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
      longitude: -111.891047,
      latitude: 40.760779,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    const { title, company, description, created_at } = job;
    let date = new Date(created_at).toLocaleDateString();

    return (
      <Card title={title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          />
        </View>

        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{date}</Text>
        </View>
        <Text>
          {description
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/<strong>/g, '')
            .replace(/<\/strong>/g, '')
            .replace(/<ul>/g, '')
            .replace(/<\/ul>/g, '')
            .replace(/<li>/g, '')
            .replace(/<\/li>/g, '')}
        </Text>
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
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  // console.log('jobs', { jobs });
  return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
