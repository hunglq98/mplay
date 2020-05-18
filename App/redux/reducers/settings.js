const initalState = {
    theme: 'light', 
    topTabs: ['playlists', 'artists', 'albums', 'folders']
}

export default function (state = initalState, action) {
    switch (action.type) {
        case 'set_theme':
            return {...state, theme: action.payload}; 
        case 'set_top_tabs': 
            return {...state, topTabs: action.payload}; 
        default:
            return state; 
    }
}