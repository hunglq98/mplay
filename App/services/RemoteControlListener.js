import TrackPlayer from 'react-native-track-player'; 
import store from '../redux/store'; 


let flag = false; 

async function backgroundPlayback(track) {
    if (flag) return; 
    flag = true 
    setTimeout(() => (flag = false), 250)
    await TrackPlayer.reset() 
    await TrackPlayer.add(track) 
    store.dispatch({type: 'current_track', payload: track})
    TrackPlayer.play() 
    store.dispatch({type: 'set_playback', payload: true})
}


module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play() 
        store.dispatch({type: 'set_playback', payload: true})
    })
}