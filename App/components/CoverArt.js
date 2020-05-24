import React from 'react'; 
import {Dimensions} from 'react-native'; 
import styled from 'styled-components/native'; 

const ImageSize = Dimensions.get('window').width * 0.82; 

const placeholder = require('../icons/placeholder.jpg')

const CoverArt = (props) => {
    const imgSource = props.src ? {uri: props.src} : placeholder; 
    return <Cover source={imgSource} />
}

export default CoverArt;

const Cover = styled.Image`
    height: ${ImageSize}px; 
    width: ${ImageSize}px; 
    border-radius: 5px; 
`;