import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as actions from '../redux/actions';
import InputDialog from './InputDialog';
import ConfirmDialog from './ConfirmDialog';
import RenderToast from '../components/RenderToast';
import {elevatedBGColor, contrastColor} from '../themes/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function PlaylistOptions(props) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);

  const {selectedPlaylist, isVisible, onPressCancel} = props;

  function onPressRename(newName) {
    let playlistName = newName.trim();
    if (playlistName === selectedPlaylist) return setRenameModalVisible(false);
    if (playlistName) {
      let keys = Object.keys(props.playlists);
      let index = keys.indexOf(playlistName);
      if (index === -1) {
        props.renamePlaylist(selectedPlaylist, playlistName);
        setRenameModalVisible(false);
        props.onPressCancel();
      } else RenderToast('Tên playlist đã tồn tại');
    }
  }

  function onDeleteConfirm() {
    setDialogVisible(false);
    props.onPressCancel();
    props.deletePlaylist(selectedPlaylist);
  }

  return (
    <StyledModal
      isVisible={isVisible}
      swipeDirection="down"
      deviceHeight={SCREEN_HEIGHT}
      onBackButtonPress={onPressCancel}
      onBackdropPress={onPressCancel}
      onSwipeComplete={onPressCancel}
      backdropColor="black"
      animationInTiming={100}
      animationOutTiming={100}
      hideModalContentWhileAnimating>
      <ModalContentWrapper>
        <TextWrapper>
          <ModalTitle numberOfLines={1}>{selectedPlaylist}</ModalTitle>
        </TextWrapper>
        <ListItem
          title="Rename"
          iconProps={icons.rename}
          onPress={() => setRenameModalVisible(true)}
        />
        <ListItem
          title="Delete"
          iconProps={icons.delete}
          onPress={() => setDialogVisible(true)}
        />
        <InputDialog
          title="Rename playlist"
          name={selectedPlaylist}
          saveButtonTitle="Rename"
          inputPlaceholder="Nhập tên playlist mới"
          onPressSave={onPressRename}
          onPressCancel={() => setRenameModalVisible(false)}
        />
        <ConfirmDialog
          title="Confirm delete"
          buttonTitle="Delete"
          cancelButton
          description="Chắc chắn muốn xóa playlist này?"
          onCancel={() => setDialogVisible(false)}
          onConfirm={onDeleteConfirm}
          isVisible={isDialogVisible}
        />
      </ModalContentWrapper>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  align-items: center;
`;

const ModalContentWrapper = styled.View`
  height: 172px;
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
  font-size: 15px;
  text-align: center;
  color: ${contrastColor};
`;

const icons = {
  rename: {
    name: 'edit',
    type: 'feather',
    size: 20,
  },
  delete: {
    name: 'trash-2',
    type: 'feather',
    size: 20,
  },
};
