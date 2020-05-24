import React from 'react'; 
import {Dimensions} from 'react-native'; 
import styled, {withTheme} from 'styled-components/native'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'; 
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {contrastTranscolor} from '../themes/styles'; 

const ScreenWidth = Dimensions.get('window').width; 
const SliderWidth = ScreenWidth * 0.82 

class ProgressSlider extends ProgressComponent {
    render() {
        
    }
}