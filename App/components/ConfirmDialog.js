import React from 'react'; 
import Dialog from 'react-native-dialog'; 
import styled, {withTheme} from 'styled-components/native'; 
import {foreground2Color, contrastColor} from '../themes/styles'; 


function ConfirmDialog(props) {
    const {title, description, buttonTitle, isVisible, onCancel, cancelButton} = props; 
    const {foreground, contrast, elevatedBG} = props.theme; 
    return (
        <Dialog.Container
            visible={isVisible} 
            backdropColor="black" 
            onBackButtonPress={onCancel} 
            onBackdropPress={{backdropColor: elevatedBG}}
        >
            <Dialog.Title style={styles.title} numberOfLines={2}>{title}</Dialog.Title>
            <Dialog.Description style={styles.descripition}>{description}</Dialog.Description>
            {cancelButton ? (
                <Dialog.Button label="Cancel" color={contrast} onPress={onCancel} />
            ): null }
            <Dialog.Button label={buttonTitle} color={foreground} onPress = {props.onConfirm} />
        </Dialog.Container>
    )
}

export default withTheme(ConfirmDialog);

const styles = {
    title: {
        fontFamily: 'ProductSans', 
        marginLeft: 10, 
        color: `${foreground2Color}`
    }, 
    descripition: {
        fontFamily: 'ProductSans', 
        padding: 10, 
        color: `${contrastColor}`
    }
};
