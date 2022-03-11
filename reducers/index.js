import actions from './actions';

import AsyncStorage from '@react-native-async-storage/async-storage';

const save = (bookmarks) => { 
  AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    .then( () => { console.log('Sauvegarde ok'); } )
    .catch( (err) => { console.log(err.message); } )
}

const STATE = {
  bookmarks: []
}

export default function MainReducer(state = STATE, action) {
  const newState = { ...state }
  switch (action.type) {
    case actions.ADD_BOOKMARK:
      newState.bookmarks = [...newState.bookmarks]
      newState.bookmarks.push(action.payload);
      save(newState.bookmarks); // <- SAUVEGARDE !
      return newState;
    case actions.REMOVE_BOOKMARK:
      newState.bookmarks = [...newState.bookmarks]
      const game = newState.bookmarks.find( item => item.id==action.payload )
      const index = newState.bookmarks.indexOf(game)
      newState.bookmarks.splice(index,1);
      save(newState.bookmarks); // <- SAUVEGARDE !
      return newState;
    case actions.REPLACE_BOOKMARKS:
      newState.bookmarks = action.payload;
      return newState;
  }
  return newState; 
}

