/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player'; 
import bgService from './App/services/RemoteControlListener'; 

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => bgService)
