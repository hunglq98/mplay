import MusicFiles from 'react-native-get-music-files';
import RNFetchBlob from 'rn-fetch-blob';
import {store} from '../store'; 
import {getStoragePermissions, checkStoragePermissions} from '../../helpers/permissions';
import getMediaInfo from '../../helpers/media';

const trackInforReq = {
    title: true, 
    artist: true, 
    album: true, 
    cover: false, 
    blured: false,
    duration: true 
}

export const getMedia = () => async (dispatch) => {
    const granted = await checkStoragePermissions(); 
    if (!granted) await getStoragePermissions(); 
    if (granted) {
        console.log('granted')
    }
    const {media} = store.getState()
    if (media.mediaLoaded) {
        const media = await getMediaWithCovers(); 
        dispatch({type: 'get_media_success', payload: media});
    } else {
        const results = await MusicFiles.getAll(trackInforReq); 
        const media = getMediaInfo(results) 
        dispatch({type: 'get_media_success', payload: media})
        const mediaWithCovers = await getMediaWithCovers() ; 
        dispatch({type: 'get_media_success', payload: mediaWithCovers})
    }
}

const getMediaWithCovers = async () => {
    const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + '/.MPlay'; 
    let result = await MusicFiles.getAll({
        ...trackInforReq, 
        cover: true, 
        coverFolder, 
    })
    return getMediaInfo(result);
}