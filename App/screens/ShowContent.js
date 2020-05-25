import React, {useState, useEffect} from 'react'; 
import {View, FlatList} from 'react-native'; 
import {connect} from 'react-redux'; 
import * as actions from '../redux/actions'; 
import RenderTrack from '../components/RenderTrack'; 
import {flatListItemLayout} from '../helpers/FlatListLayout';

function ShowContent(props) {
    const [modal, setModal] = useState({visible: false, item: {}})

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', props.hideFooter);
        return unsubscribe
    }, [props.navigation])
    return (
        <View style = {{flex: 1}}>
            <FlatList
                keyExtractor = {(asset) => asset.id.toString() }
                renderItem = {({item}) => <RenderTrack item={item} setOptions={setModal} /> }
                data={props.route.params.content}
                getItemLayout={flatListItemLayout}
             />
        </View>
    )
}

export default connect(null, actions)(ShowContent)