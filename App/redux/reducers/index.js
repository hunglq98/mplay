import {combineReducers} from 'redux'; 
import media from './media'; 
import playback from './playback'; 
import playlist from './playlist';
import settings from './settings'; 
import footer from './footer';
import player from './blacklistPlayback';

export default combineReducers({
    media, 
    playback, 
    playlist, 
    settings, 
    footer, 
    player,
    settings
})