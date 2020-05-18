import {combineReducers} from 'redux'; 
import media from './media'; 
import playback from './playback'; 
import playlist from './playlist';
import settings from './settings'; 

export default combineReducers({
    media, 
    playback, 
    playlist, 
    settings
})