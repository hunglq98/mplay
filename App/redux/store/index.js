import {createStore, compose, applyMiddleware} from 'redux'; 
import thunk from 'redux-thunk'; 
import {persistStore, persistReducer} from 'redux-persist'; 
import {AsyncStorage} from 'react-native'; 
import reducers from '../reducers'; 

const persistConfig = {
    key: 'root', 
    storage: AsyncStorage, 
    blacklist: ['footer', 'player', 'search']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistReducer, {}, compose(applyMiddleware(thunk)));
export const persistor = persisStore(store)