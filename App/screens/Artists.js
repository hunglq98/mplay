import React, {useState, useEffect} from 'react'; 
import {View, Text, FlatList} from 'react-native'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'; 
import {flatListCardLayout} from '../helpers/FlatListLayout';
import Category from '../components/Category'; 

function Artists(props) {

    useEffect(() => {
        let unsubsribe = props.navigation.addListener('focus', props.showFooter); 
        return unsubsribe; 
    }, [props.navigation])


    function onArtistPress(title, content) {
        props.navigation.navigate('content', {title, content}); 
    }

    function renderArtists({item, index}) {
        if (item.empty) return <View style={styles.itemInvisible} />; 
        let songsWithCover = item.data.filter((song) => song.artwork !== 'cover'); 
        let cover = songsWithCover.length === 0 ? 'cover': songsWithCover[0].artwork;
        return (
            <Category title={item.title} image={cover} index={index} numOfTracks={item.data.length} onPress={() => onArtistPress(item.title, item.data)} />
        )
    }

    function mediaListParser() {
        let selectionsData = []; 
        
    }

    return (
        <View>
            <Text>Artists screen</Text>
        </View>
    )
}

export default Artists;

const styles = {
	itemInvisible: {
		backgroundColor: 'transparent'
	}
};
