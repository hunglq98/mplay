
const initialState = {
    mediaFiles: [], 
    mediaLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'get_media_success':
            return {mediaLoaded: true, mediaFiles: action.payload}        
    
        case 'rename_track': {
            const mediaList = [...state.mediaFiles] 
            const index = mediaList.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) mediaList[index] = action.payload; 
            return {...state, mediafiles: mediaList}
        }

        case 'delete_track': {
            const mediaList = [...state.mediaFiles]
            const index = mediaList.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                mediaList.splice(index, 1) 
                mediaList = mediaList.map((item, index) => {
                    return {...item, index: i}
                })
                return {...state, mediaFiles: mediaList}
            }
        }
        default:
            return state
    }
}