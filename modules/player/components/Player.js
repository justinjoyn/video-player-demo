import { ScreenOrientation, Video } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { retrieveData, storeData } from '../../../common/utils';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      duration: 0,
      progress: 0,
      video: null,
      shouldPlay: true,
      useNativeControls: true
    };
  }

  componentDidMount() {
    let video = this.props.navigation.getParam('video', null);
    this.setState({
      video: video
    });
    this.getProgress(video);
  }

  saveProgress = async (duration, position) => {
    let progress = 0;
    if (position != 0) progress = (position / duration).toFixed(1);
    storeData(
      `VIDEO_${this.state.video.id}_PROGRESS`,
      JSON.stringify({
        position: position,
        duration: duration,
        progress: progress
      })
    );
  };

  getProgress = async video => {
    let status = await retrieveData(`VIDEO_${video.id}_PROGRESS`);
    if (status) {
      let parsedStatus = JSON.parse(status);
      if (this._mounted) {
        this.setState(parsedStatus);
      }
    }
  };

  _onPlaybackStatusUpdate(event) {
    if (event.isPlaying) {
      this.saveProgress(event.durationMillis, event.positionMillis);
    }
  }

  _onFullscreenUpdate(event) {
    if (event.fullscreenUpdate === 1) {
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    } else {
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    }
  }

  _onLoad(event) {
    if (this.state.position) this.video.setPositionAsync(this.state.position);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        {this.state.video ? (
          <Video
            progressUpdateIntervalMillis={1000}
            ref={r => (this.video = r)}
            onFullscreenUpdate={this._onFullscreenUpdate.bind(this)}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate.bind(this)}
            onLoad={this._onLoad.bind(this)}
            ref={r => (this.video = r)}
            source={{ uri: this.state.video.source }}
            posterSource={{ uri: this.state.video.thumb }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={{ width: '100%', height: 255 }}
            useNativeControls={this.state.useNativeControls}
            shouldPlay={this.state.shouldPlay}
            usePoster
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
