import React from 'react'; 
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MainStack from './MainStack'
import Player from '../screens/Player'
import AddToPlaylist from '../screens/AddToPlaylist'

const screenOptions = {
    ...TransitionPresets.ModalPresentationIOS, 
    gestureEnabled: true, 
    cardOverlayEnabled: true
}

function RootStack() {
    const Modal = createStackNavigator() 
    return (
        <Modal.Navigator
            mode="modal" 
            headerMode="none" 
            initialRouteName="main"
            screenOptions={screenOptions}
        >
            <Modal.Screen name = "main" component={MainStack}  />
            <Modal.Screen name = "player" component={Player} />
            <Modal.Screen name = "addToPlaylist" options={{title: "Add to playlist"}} component={AddToPlaylist}  />
        </Modal.Navigator>
    )
}

export default RootStack;