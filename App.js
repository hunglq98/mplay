import React, {useState, useEffect} from 'react'; 
import {View, Text} from 'react-native'; 
import {Provider} from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {
  const [runTime, setRunTime] = useState(false) 

  useEffect(() => {
    setTimeout(() => setRunTime(true), 800);
    
  })
  return (
    <View>
      <Text>Main App</Text>
    </View>
  )
}