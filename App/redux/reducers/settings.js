const initalState = {
    theme: 'light', 
    foldersToSkip: [],
    topTabs: ['playlists', 'artists', 'albums', 'folders']
}

export default function (state = initalState, action) {
    switch (action.type) {
        case 'set_theme':
            return {...state, theme: action.payload}; 
        case 'set_top_tabs': 
            return {...state, topTabs: action.payload}; 
        case 'add_folders_to_skip': 
            return {...state, foldersToSkip: action.payload}
        default:
            return state; 
    }
}