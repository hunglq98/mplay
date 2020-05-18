import React from 'react'; 
import {createStackNavigator, TransitionPress} from '@react-navigation/stack';

export default function RootStack() {
    const Modal = createStackNavigator() 
    return (
        <Modal.Navigator
            mode="modal" 
            headerMode="none" 
            initialRouteName="main"
        >
            <Modal.Screen name = "main" />
            <Modal.Screen name = "player" />
            <Modal.Screen name = "addToPlaylist" options={{title: "Add to playlist"}} />
            <Modal.Screen name = "lyrics"/>
        </Modal.Navigator>
    )
}