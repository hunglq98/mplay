import React, {useState, useEffect} from 'react'; 
import {View, Text, FlatList, ScrollView} from 'react-native'; 
import styled from 'styled-components'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'; 
import ListItem from '../components/ListItem'; 
import InputDialog from '../components/InputDialog'; 
import Icon from '../components/Icon'; 
import RenderToast from '../components/RenderToast'; 
import {contrastTransColor} from '../themes/styles';

function Playlists(props) {
    const [isModalVisible, setModalVisible] = useState(false); 
    const [optionsModal, setOptionsModal] = useState({visible: false, name: ''})
    return (
        <View>
            <Text>Playlists screen</Text>
        </View>
    )
}

export default Playlists;