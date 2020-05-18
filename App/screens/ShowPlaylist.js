import React from 'react'; 
import {View, Text} from 'react-native'; 
import * as actions from '../redux/actions';
import { connect } from 'react-redux';

function Player() {
    return (
        <View>
            <Text>show playlist</Text>
        </View>
    )
}

export default connect(null, actions)(Player)