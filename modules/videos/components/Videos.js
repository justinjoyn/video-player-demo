import React, { Component } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivityLoader from '../../common/ActivityLoader';
import { getVideos } from '../actions';
import Thumbnail from './Thumbnail';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      videos: props.videos
    };
  }

  componentDidMount() {
    if (this.props.videos.length === 0) this.props.getVideos();
  }

  _renderHeader() {
    return (
      <View>
        <Text style={styles.pageTitle}>Videos</Text>
      </View>
    );
  }

  _renderSectionHeader(title) {
    return (
      <View style={styles.sectionHeader} key={title}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  }

  onPlayClicked(video) {
    this.props.navigation.navigate('Player', { video: video });
  }

  _renderSection(item, index, section) {
    return (
      <Thumbnail
        video={item}
        key={'VIDEO_' + item.id}
        onPlayClicked={this.onPlayClicked.bind(this)}
      />
    );
  }

  renderSections() {
    return (
      <SectionList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={this._renderHeader()}
        renderItem={({ item, index, section }) => this._renderSection(item, index, section)}
        renderSectionHeader={({ section: { title } }) => this._renderSectionHeader(title)}
        sections={this.state.videos}
        keyExtractor={(item, index) => item + index}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        {this.props.isLoading ? <ActivityLoader loading={true} /> : this.renderSections()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getVideos
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  videos: state.videos.videos.data,
  isLoading: state.videos.videos.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Videos);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF'
  },
  pageTitle: {
    fontFamily: 'product-sans-regular',
    padding: 10,
    fontSize: 40
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF'
  },
  sectionTitle: {
    fontFamily: 'product-sans-regular',
    padding: 10,
    fontSize: 22
  }
});
