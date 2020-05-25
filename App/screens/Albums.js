import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import _ from 'underscore';
import Category from '../components/Category';
import {flatListCardLayout} from '../helpers/FlatListLayout';

function Albums(props) {
  useEffect(() => {
    let unsubscribe = props.navigation.addListener('focus', props.showFooter);
    return unsubscribe;
  }, [props.navigation]);

  function onAlbumPress(title, content) {
    props.navigation.navigate('content', {title, content});
  }

  function renderAlbums({item, index}) {
    if (item.empty) return <View styles={styles.itemInvisible} />;
    let songsWithCover = item.data.filter(song => song.artwork !== 'cover');
    let cover = songsWithCover.length === 0 ? 'cover' : songsWithCover[0].artwork;
    return (
      <Category
        title={item.title}
        image={cover}
        index={index}
        numOfTracks={item.data.length}
        onPress={() => onAlbumPress(item.title, item.data)}
      />
    );
  }

  function mediaListParser() {
      let sectionsData = []; 
      let data = _.groupBy(props.media, 'album') 
      let titles = Object.keys(data) 
      titles.forEach((title) => {
          sectionsData.push({
              title, 
              data: data[title]
          })
      })
      let unknownAlbum = sectionsData.filter((item) => item.title === 'null')
      unknownAlbum = unknownAlbum.map((item) => (item.title = 'unknown'))
      let sortedData = _.sortBy(sectionsData, 'title').filter((item) => item.title !== 'null')
      return sortedData; 
  }

  let bottomMargin = props.currentTrack.id !== '0000' ? {marginBottom: 60} : {flex: 1}

  return (
      <View style={bottomMargin}>
          <FlatList 
            data={mediaListParser()}
            renderItem={renderAlbums}
            numColumns={2}
            getItemLayout={flatListCardLayout} 
            keyExtractor={(asset) => asset.title.toString()} />
      </View>
  )

}

function mapStateToProps(state) {
    return {
        media: state.media.mediaFiles, 
        currentTrack: state.playback.currentTrack
    }
}

export default connect(mapStateToProps, actions)(Albums);

const styles = {
  itemInvisible: {
    backgroundColor: 'transparent',
  },
};
