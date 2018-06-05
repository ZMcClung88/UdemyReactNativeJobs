import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  renderCard(job) {
    return (
      <Card title={job.title} />
      <View style={styles.detailWrapper}>
        <Text>{job.company}</Text>
        <Text>{job.created_at}</Text>
      </View>
      <Text>
        {job.description}
      </Text>
    );
  }
  render() {
    return (
      <View>
        <Swipe data={this.props.jobs} renderCard={this.renderCard} />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);
