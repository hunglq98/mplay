const initialState = {
    isPlaying: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'set_playback': 
            return {...state, isPlaying: action.payload}
        default: 
            return state
    }
}