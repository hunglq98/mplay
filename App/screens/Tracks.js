import React, {useState, useEffect} from 'react'; 
import {View, Animated, Text, Dimensions, StatusBar} from 'react-native'; 
import styled from 'styled-components/native'; 
import TrackPlayer from 'react-native-track-player'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions';
import RenderTrack from '../components/RenderTrack'; 
import {flatListItemLayout} from '../helpers/FlatListLayout';
import {contrastColor} from '../themes/styles'; 
import setupPlayer from '../services/setupPlayer';
const ScreenHeight = Dimensions.get('window').height; 
const StatusBarHeight = StatusBar.currentHeight; 
const FooterHeight = 60; 
const BottomTabHeight = 49; 
const ViewportHeight = ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight)
const itemHeight = 75; 
 
function Tracks(props) {
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const [modal, setModal] = useState({visible: false, item: {}})
    const {currentTrack, mediaLoaded, media}  = props; 

    useEffect(() => {
        props.getMedia(); 
        console.log(media)
    })
    console.log(scrollY)
    return (<View><Text>tracks</Text></View>)
}

function mapStateToProps(state) {
    return {
        currentTrack: state.playback.currentTrack, 
        media: state.media.mediaFiles, 
        mediaLoaded: state.media.mediaLoaded
    }
}

export default connect(mapStateToProps, actions)(Tracks)