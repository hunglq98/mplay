import React, {useState, useEffect} from 'react'; 
import {View, Text} from 'react-native'; 
import {Provider} from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './App/redux/store'
import RootNavigator from './App/navigation';
import RootStack from './App/navigation/RootStack';

export default function App() {
  const [runTime, setRunTime] = useState(false) 

  useEffect(() => {
    setTimeout(() => setRunTime(true), 750);
    store.dispatch({type: 'set_playback', payload: false})
    if (Text.defaultProps == null) Text.defaultProps = {}; 
    Text.defaultProps.allowFontScaling = false; 
    console.disableYellowBox = true; 
  })

  function renderApp(isReady) {
    if (isReady && runTime) {
      return <RootNavigator />
    }
    return (<View><Text>Screen</Text></View>)
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {renderApp}
      </PersistGate>
    </Provider>
  )
}