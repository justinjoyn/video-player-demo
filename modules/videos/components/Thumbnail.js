import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation, Video } from 'expo';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { storeData, retrieveData } from '../../../common/utils';

class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      shouldPlay: false,
      useNativeControls: false,
      position: 0,
      duration: 0,
      progress: 0,
      showPlayButton: false
    };
    this._mounted = false;
  }

  componentDidMount = async () => {
    this._mounted = true;
    this.getProgress();
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  onPlayClicked() {
    this.video.presentFullscreenPlayer();
  }

  saveProgress = async () => {
    let progress = 0;
    if (this.state.position != 0) progress = (this.state.position / this.state.duration).toFixed(1);

    this.setState({
      progress: progress
    });

    storeData(
      `VIDEO_${this.props.video.id}_PROGRESS`,
      JSON.stringify({
        position: this.state.position,
        duration: this.state.duration,
        progress: progress
      })
    );
  };

  getProgress = async () => {
    let status = await retrieveData(`VIDEO_${this.props.video.id}_PROGRESS`);
    if (status) {
      let parsedStatus = JSON.parse(status);
      if (this._mounted) {
        this.setState(parsedStatus);
      }
    }
  };

  _onPlaybackStatusUpdate(event) {
    if (event.isPlaying) {
      this.setState({
        duration: event.durationMillis,
        position: event.positionMillis
      });
    }
  }

  _onFullscreenUpdate(event) {
    if (event.fullscreenUpdate === 1) {
      this.setState({
        useNativeControls: true,
        shouldPlay: true
      });
      this.video.playAsync();
      if (this.state.position) this.video.setPositionAsync(this.state.position);
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    } else {
      this.saveProgress();
      this.setState({
        useNativeControls: false,
        shouldPlay: false
      });
      this.video.stopAsync();
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    }
  }

  _onLoad(event) {
    this.setState({
      showPlayButton: true
    });
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{this.props.video.title}</Text>
        <Text style={styles.subTitle}>{this.props.video.subtitle}</Text>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Video
              ref={r => (this.videoRef[this.props.video.id] = r)}
              onFullscreenUpdate={this._onFullscreenUpdate.bind(this)}
              onPlaybackStatusUpdate={this._onPlaybackStatusUpdate.bind(this)}
              onLoad={this._onLoad.bind(this)}
              ref={r => (this.video = r)}
              source={{ uri: this.props.video.source }}
              posterSource={{ uri: this.props.video.thumb }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              style={{ width: '100%', height: 255 }}
              useNativeControls={this.state.useNativeControls}
              shouldPlay={this.state.shouldPlay}
              usePoster
            />
            {this.state.showPlayButton ? (
              <TouchableOpacity onPress={() => this.onPlayClicked()} style={styles.playIcon}>
                <Ionicons name='ios-play-circle' size={60} color='#FFFFFF' />
              </TouchableOpacity>
            ) : null}
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
  }
});

export default Thumbnail;
