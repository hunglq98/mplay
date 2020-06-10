const initalState = {
  currentTrack: {
    id: '0000',
    title: 'Track0',
    artist: 'Unknown',
    duration: 0,
    artwork: 'cover',
  },
  loop: false,
  shuffle: false,
  repeatPlaylist: [], 
};
  
export default function (state = initalState, action) {
  switch (action.type) {
    case 'current_track':
      return { ...state, currentTrack: action.payload };
    case 'set_loop':
      return { ...state, loop: action.payload };
    case 'set_shuffle':
      return { ...state, shuffle: action.payload };
    default:
      return state;
  }
}
