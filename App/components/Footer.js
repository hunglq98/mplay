import React from 'react'; 
import {Dimensions, TouchableWithoutFeedback} from 'react-native';
import styled, {withTheme} from 'styled-components/native'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks'
import * as navigation from '../navigation/NavigationService'; 
import { contrastColor, elevatedBGColor, contrastTransColor } from '../themes/styles';


function Footer(props) {
    const {isPlaying, renderFooter, currentTrack, theme} = props; 
    const {position, duration} = useTrackPlayerProgress(100); 

    function togglePlayback() {
        props.setPlayback(!isPlaying) 
    }

    const progress = position / duration; 
    const coverSource = currentTrack.artwork ? {uri: currentTrack.artwork} : require('../icons/placeholder.jpg');
    return renderFooter && currentTrack.id != '0000' ? (
        <TouchableWithoutFeedback onPress = {() => navigation.navigate('player')}>

        </TouchableWithoutFeedback>
    ) : null 
}


const ViewWrapper = styled.View`
    height: 60px; 
    position: absolute; 
    left: 0px;
    right: 0px; 
    bottom: 50px; 
    flex-direction: row; 
    align-items: center; 
    padding-left: 15px; 
    background-color: ${elevatedBGColor}
`;


const Thumbnail = styled.Image`
    height: 42px; 
    width: 42px; 
    border-radius: 21px; 
`;

SCREEN_WIDTH = Dimensions.get('window').width;

const TextWrapper = styled.View`
    font-family: 'CircularBold'; 
    font-size: 14px; 
    color: ${contrastColor}; 
    width: ${Dimensions.get('window').width}px;
`;

const Title = styled.Text`
    font-family: 'CircularLight'; 
    font-size: 12px; 
    color: ${contrastColor(0.8)}; 
    width: ${SCREEN_WIDTH / 2}px; 
`;

const StyledIcon = styled(Icon)`
	color: ${contrastColor};
	padding: 18px;
`;

const ProgressWrapper = styled.View`
	position: absolute;
	top: 0;
`;

const Progress = styled(ProgressBar)`
	height: 2px;
	width: ${SCREEN_WIDTH}px;
	background-color: ${contrastTransColor(0.1)};
`;

const icons = {
	playIcon: {
		name: 'play-arrow',
		type: 'material',
		size: 24
	},
	pauseIcon: {
		name: 'pause',
		type: 'material',
		size: 24
	}
};