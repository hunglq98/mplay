const initialState = {
  favorites: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'create_playlist':
      return { ...state, [action.payload]: [] };
    case 'add_to_playlist': {
      let { title, song } = action.payload;
      let updatedList = { ...state };
      updatedList[title].push(song);
      return { ...updatedList };
    }
    case 'remove_from_playlist': {
      let playlists = { ...state };
      let { playlistTitle } = action.payload;
      let item = playlists[playlistTitle].findIndex(
        (item) => item.title === action.payload.title,
      );
      if (index !== -1) playlists[playlistTitle].splice(index, 1);
      return { ...playlists };
    }
    case 'rename_playlist': {
      let { oldTitle, newTitle } = action.payload;
      let newList = { ...state };
      newList[newTitle] = newList[oldTitle];
      delete newList[oldTitle];
      return { ...newList };
    }
    case 'delete_playlist': {
      let newList = { ...state };
      delete newList[action.payload];
      return { ...newList };
    }
    default:
      return state;
  }
}
