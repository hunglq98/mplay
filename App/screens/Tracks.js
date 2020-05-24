import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  Text,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import RenderTrack from '../components/RenderTrack';
import {flatListItemLayout} from '../helpers/FlatListLayout';
import {contrastColor} from '../themes/styles';
import setupPlayer from '../services/setupPlayer';
import OptionsModal from '../components/OptionsModal';

const ScreenHeight = Dimensions.get('window').height;
const StatusBarHeight = StatusBar.currentHeight;
const FooterHeight = 60;
const BottomTabHeight = 49;
const ViewportHeight =
  ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
const itemHeight = 75;

function Tracks(props) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [modal, setModal] = useState({visible: false, item: {}});
  const {currentTrack, mediaLoaded, media} = props;

  useEffect(() => {
    props.getMedia();
    console.log(media);
  }, []);

  useEffect(() => {
    let unsubscribe = props.navigation.addListener('focus', props.showFooter);
    return unsubscribe;
  }, [props.navigation]);
  console.log(scrollY);

  const renderMargin =
    currentTrack.id != '0000' ? {marginBottom: 60, flex: 1} : {flex: 1};
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  if (mediaLoaded) {
    if (media.length > 0) {
      return (
        <View style={renderMargin}>
          <FlatList
            keyExtractor={asset => asset.id.toString()}
            data={media}
            scrollEventThrottle={16}
            initialScrollIndex={currentTrack.inidex || undefined}
            itemHeight={itemHeight}
            ViewportHeight={ViewportHeight}
            renderItem={({item}) => (
              <RenderTrack item={item} setOptions={setModal} />
            )}
          />
          <Animated.View style={[styles.header, {height: headerHeight}]} />
          <OptionsModal
            selectedTrack={modal.item}
            isVisible={modal.visible}
            onPressCancel={() => setModal({...modal, visible: false})}
          />
        </View>
      );
    }
  }

  // return (<    View><Text>tracks</Text></View>)
}

function mapStateToProps(state) {
  return {
    currentTrack: state.playback.currentTrack,
    media: state.media.mediaFiles,
    mediaLoaded: state.media.mediaLoaded,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Tracks);

const styles = {
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  thumbStyle: {
    width: 4,
    borderWidth: 0,
  },
  flatlistContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
};
