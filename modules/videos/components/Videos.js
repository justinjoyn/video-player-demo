import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView } from 'react-navigation';
import ActivityLoader from '../../common/ActivityLoader';
import { getVideos } from '../actions';
import _ from 'lodash';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    return null;
  }

  componentDidMount() {
    this.props.getVideos();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
        
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
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column'
  },
  cardBody: {
    flex: 1
  },
  cardFooter: {
    flexDirection: 'row'
  },
  cardTitle: {
    fontFamily: 'product-sans-regular',
    fontSize: 24
  },
  footerButton: {
    flex: 1,
    borderRadius: 5
  },
  footerButtonText: {
    fontFamily: 'product-sans-regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 10
  }
});
