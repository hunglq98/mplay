import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import Icon from '../components/Icon';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import {Button} from 'react-native-elements';
import SearchInput from '../components/SearchInput';
import axios from 'axios';
import {
  contrastColor,
  backgroundColor,
  contrastTransColor,
} from '../themes/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;


function Folder(props) {
  const [searchString, setSearchString] = useState('');
  const [isSearchFocused, setSearchFocus] = useState(false);
  const [modal, setModal] = useState({visible: false, item: {}});
  const [result, setResult] = useState([]);
  console.log(result.data)
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


  function onSearch() {
    axios
      .get('http://localhost:3000/search/tinh&ca')
      .then((res) => {
        setResult(JSON.parse(res.data))
      })
      .catch(e => console.log('ERROR', e));
  }

  function onTitlePress(item) {
    console.log(item)
  }


  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput
          value={searchString}
          setSearchInput={setSearchString}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </SearchWrapper>
      <SearchWrapper>
        <Button style={{marginTop: 6}} title="Tìm kiếm" onPress={onSearch} />
      </SearchWrapper>
      <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={result.data}
      renderItem={({item}) => (
       <Touchable onPresss = {onTitlePress(item)}>
           <TextWrapper>
           <Title numberOfLines={1}>
            {item._title_ascii}
          </Title>
           </TextWrapper>
       </Touchable> 
      )}
      getItemLayout={(data, index) => (
        {length: 40, offset: 40 * index, index}
      )}
       />
      {/* <View style={{flex: 1}}>
        {renderSearch()}
        <OptionsModal
          selectedTrack={modal.item}
          isVisible={modal.visible}
          onPressCancel={() => setModal({...modal, visible: false})}
        />
      </View> */}
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


const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 65px;
  margin-top: 10px;
  padding-left: 15px;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  flex: 1;
  height: 52px;
  margin-left: 15px;
  justify-content: space-evenly;
`;

const Title = styled.Text`
  font-family: 'CircularBold';
  font-size: 14px;
  width: ${SCREEN_WIDTH / 2}px;
  color: ${props =>
    props.current ? foregroundColor(props) : contrastColor(props)};
`;