import React, {useRef, useState, useEffect} from 'react'; 
import {View, TouchableWithoutFeedback as Touchable} from 'react-native'; 
import {useNavigation} from '@react-navigation/native'; 
import Menu, {MenuItem} from 'react-native-material-menu'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'; 
import RenderToast from '../components/RenderToast'; 

function OptionsMenu(props) {
    const menuRef = useRef(null) 
    const navigation = useNavigation(); 


    function onAddToPlaylist() {
        menuRef.current.hide(); 
        navigation.navigate('addToPlaylist', {song: props.currentItem});
    }

    async function onFindChord() {

    }

    const button = <Touchable onPress={() => menuRef.current.show()}>{props.target}</Touchable>


    return (
        <View>
            <Menu ref={menuRef} button={button}>
                <MenuItem onPress={onAddToPlaylist} textStyle={styles.menuItemText}>
                    Thêm vào danh sách phát
                </MenuItem>
            </Menu>
        </View>
    )
}

export default OptionsMenu;

const styles = {
    menuItemText: {
        fontFamily: 'ProductSans', 
        fontSize: 16, 
        color: 'black'
    }
}