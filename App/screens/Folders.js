import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import Icon from '../components/Icon';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import SearchInput from '../components/SearchInput';
import {
  contrastColor,
  backgroundColor,
  contrastTransColor,
} from '../themes/styles';

function Folder(props) {
  const [searchString, setSearchString] = useState('');
  const [isSearchFocused, setSearchFocus] = useState(false);
  const [modal, setModal] = useState({visible: false, item: {}});

  useEffect(() => {
    let unsubscribe1 = props.navigation.addListener('focus', props.showFooter);
    let unsubscribe2 = props.navigation.addListener('blur', () =>
      setSearchString(''),
    );
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [props.navigation]);

  function listFilter() {
    if (searchString) {
      return props.media.filter(item => {
        let itemData = ` ${item.title} ${item.artist}`.toUpperCase();
        let searchData = ' ' + searchString.toUpperCase();
        return itemData.indexOf(searchData) > -1;
      });
    }
  }

  function renderSearch() {
    const renderMargin =
      props.currentTrack.id !== '0000' ? {marginBottom: 60} : {flex: 1};
    return isSearchFocused || searchString ? (
      <FlatList
        data={listFilter()}
        renderItem={({item}) => (
          <RenderTrack item={item} setOptions={setModal} />
        )}
        keyExtractor={asset => asset.id.toString()}
        style={[styles.resultsWrapper, renderMargin]}
      />
    ) : (
      <PlaceholderWrapper>
        <SearchIcon {...styles.searchIcon} />
        <PlaceholderText>Nhập tên bài hát lên thanh tìm kiếm</PlaceholderText>
      </PlaceholderWrapper>
    );
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Tìm kiếm</Title>
      </TitleWrapper>
      <SearchWrapper>
        <SearchInput
          value={searchString}
          setSearchInput={setSearchString}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </SearchWrapper>
      <View style={{flex: 1}}>
        {renderSearch()}
        <OptionsModal
          selectedTrack={modal.item}
          isVisible={modal.visible}
          onPressCancel={() => setModal({...modal, visible: false})}
        />
      </View>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    currentTrack: state.playback.currentTrack,
    media: state.media.mediaFiles,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Folder);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

const TitleWrapper = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-family: 'CircularBold';
  font-size: 36px;
  color: ${contrastColor};
`;

const SearchWrapper = styled.View`
  margin-top: 24px;
  align-items: center;
`;

const PlaceholderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.Text`
  font-family: 'CircularBold';
  font-size: 16px;
  margin-bottom: 100px;
  color: ${contrastColor};
`;

const SearchIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  margin-bottom: 20px;
`;

const styles = {
  resultsWrapper: {
    flex: 1,
    marginTop: 10,
  },
  searchIcon: {
    name: 'search',
    type: 'feather',
    size: 62,
  },
};
