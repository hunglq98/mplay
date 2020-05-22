import React, {useState} from 'react'; 
import { Dimensions, Share } from 'react-native';
import styled from 'styled-components/native'; 
import {connect} from 'react-redux'; 
import {useNavigation, useRoute} from '@react-navigation/native'; 
import Modal from 'react-native-modal';
import {elevatedBGColor, contrastColor} from '../themes/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height; 
const SCREEN_WIDTH = Dimensions.get('window').width; 


function OptionsModal(props) {
    const [isdialogVisible, setDialogVisible] = useState(false) 
    const [isRenameModalVisible, setRenameModal] = useStatte(false); 


    const navigation = useNavigation() 
    const route = useRoute() 

    const {selectedTrack, isVisible, onPressCancel, playlistRemoveOption} = props; 

    function onAddToPlaylist() {
        props.onPressCancel() 
        navigation.navigate('addToPlaylist', {song: selectedTrack});
    }

    function onRemoveFromPlaylist() {
        props.onPressCancel() 
        props.removeFromPlaylist(route.params.title, selectedTrack)
    }

    function onPressRename(newName) {
        if (newName !== selectedTrack.title) {
            let index = newName.split('').indexOf('/'); 
            if (index === -1) {
                props.renameTrack(selectedTrack, newName)
            } else {
                console.log('Title should not contain /')
            }
        }
        setRenameModal(false); 
        props.onPressCancel()   
    }

    function onDeleteConfirm() {
        setDialogVisible(false); 
        props.onPressCancel(); 
        props.deleteTrack(seletectedTrack)
    }

    const modalTitle = `${selectedTrack.title}`; 
    const optionText = playlistRemoveOption ? 'Remove from playlist': 'Add to playlist'; 
    const optionFunc = playlistRemoveOption ? onRemoveFromPlaylist : onAddToPlaylist; 

}   


const StyledModal = styled(Modal)`
    justify-content: flex-end; 
    align-items: center; 
`; 


const ModalContentWrapper = styled.View`
    height: 310px; 
    width: ${SCREEN_WIDTH}px; 
    background-color: ${elevatedBGColor}; 
    elevation: 5; 
    justify-content: space-evenly; 
    margin-bottom: -20px; 
    border-top-left-radius: 30px; 
    border-top-right-radius: 30px; 
`; 

const TextWrapper = styled.View`
    height: 35px; 
    justify-content: center; 
    margin: 12px 15px 0 15px; 
`; 

const ModalTitle = styled.Text`
    font-family: 'Circular'; 
    font-size: 14px; 
    text-align: center; 
    color: ${contrastColor}
`

const icons = {
	playlist: {
		name: 'list',
		type: 'feather',
		size: 20
	},
	share: {
		name: 'share-2',
		type: 'feather',
		size: 20
	},
	rename: {
		name: 'edit',
		type: 'feather',
		size: 20
	},
	delete: {
		name: 'trash-2',
		type: 'feather',
		size: 20
	}
};
