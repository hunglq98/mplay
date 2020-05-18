export const createPlaylist = (title) => {
    return {
        type: 'create_playlist', 
        payload: title, 
    }
}

export const addToPlaylist = (title, song) => {
    return {
        type: 'add_to_playalist', 
        payload: {title, song}
    }
}

export const renamePlaylist = (oldTitle, newTitle) => {
    return {
        type: 'rename_playlist', 
        payload: {oldTitle, newTitle}
    }
}

export const deletePlaylist = (title) => {
    return {
        type: 'delete_playlist', 
        payload: title
    }
}

export const removeFomPlaylist = (playlistTitle, {title, artist}) => {
    return {
        type: 'remove_from_playlist', 
        payload: {playlistTitle, title, artist}
    }
}