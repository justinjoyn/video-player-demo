import { Ionicons } from '@expo/vector-icons';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { NavigationEvents } from 'react-navigation';
import { retrieveData } from '../../../common/utils';

class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      duration: 0,
      progress: 0
    };
  }

  getProgress = async () => {
    let status = await retrieveData(`VIDEO_${this.props.video.id}_PROGRESS`);
    if (status) {
      let parsedStatus = JSON.parse(status);
      this.setState(parsedStatus);
    }
  };

  _onDidFocus() {
    this.getProgress();
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <NavigationEvents onDidFocus={this._onDidFocus.bind(this)} />
        <Text style={styles.cardTitle}>{this.props.video.title}</Text>
        <Text style={styles.subTitle}>{this.props.video.subtitle}</Text>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Image source={{ uri: this.props.video.thumb }} style={styles.thumbnail} />
            <TouchableOpacity
              onPress={() => this.props.onPlayClicked(this.props.video)}
              style={styles.playIcon}>
              <Ionicons name='ios-play-circle' size={60} color='#FFFFFF' />
            </TouchableOpacity>
          </View>
          <Progress.Bar
            height={3}
            color={'#D32F2F'}
            unfilledColor={'#000'}
            progress={parseFloat(this.state.progress)}
            width={null}
            borderRadius={0}
            borderWidth={0}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 10
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: 255
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontFamily: 'product-sans-regular',
    fontSize: 16
  },
  subTitle: {
    paddingHorizontal: 10,
    fontFamily: 'product-sans-regular',
    fontSize: 12
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center'
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined
  }
});

export default Thumbnail;
