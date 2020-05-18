import React from 'react'; 
import {StatusBar, Text, View} from 'react-native'; 
import {NavigationContainer} from '@react-navigation/native'; 
import {ThemeProvider} from 'styled-components/native';
import {connect} from 'react-redux'; 
import {navigationRef} from './NavigationService'; 
import * as actions from '../redux/actions';
import * as themes from '../themes'; 

function RootNavigator(props) {
    const {theme} = props; 
    const color = themes[theme].background; 
    const statusBarContent = `${theme === 'light' ? 'dark': 'light'}-content`
    const wrapperColor = {
        colors: {
            background: color
        }
    }
    return (
        <NavigationContainer ref = {navigationRef} theme={wrapperColor}>
            <ThemeProvider theme={themes[theme]}>
                <StatusBar barStyle={statusBarContent} backgroundColor={color} animated />
                <View>
                    <Text>Root navigation</Text>
                </View>
            </ThemeProvider>
        </NavigationContainer>
    )
}

function mapStateToProps(state) {
    return {
        theme: state.settings.theme
    }
}

export default connect(mapStateToProps, actions)(RootNavigator);