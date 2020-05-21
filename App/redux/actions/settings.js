export const setTheme = (theme) => {
    return {type: 'set_theme', payload: theme} 
}

export const setTopTabs = (tabs) => {
    return {type: 'set_top_tabs', payload: tabs} 
}

export const setSkipFolders = (folders) => {
    if (folders) {
        let folderList = folders.split(',').map((item) => item.toLowerCase().trim());
        return {
            type: 'add_folders_to_skip', 
            payload: folderList
        }
    }
    return {
        type: 'add_folders_to_skip', 
        payload: []
    }
}