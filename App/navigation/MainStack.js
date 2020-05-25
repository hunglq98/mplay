import React from 'react';
import { withTheme } from 'styled-components/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';
// import AddToPlaylist from '../screens/AddToPlayList';
// import AboutScreen from '../screens/AboutScreen';
import ShowPlaylistScreen from '../screens/ShowPlaylist';
import ShowContentScreen from '../screens/ShowContent';
// import TabOrder from '../screens/TabOrder';
import Icon from '../components/Icon';
import ShowContent from '../screens/ShowContent';

const durationSpec = { config: { duration: 200 } };

function MainStack(props) {
	const Stack = createStackNavigator();
	const { background, contrast } = props.theme;

	const screenOptions = {
		...TransitionPresets.ScaleFromCenterAndroid,
		transitionSpec: {
			open: durationSpec,
			close: durationSpec
		},
		headerStyle: {
			elevation: 0,
			backgroundColor: background
		},
		headerTitleStyle: {
			fontFamily: 'Circular',
			fontWeight: '400',
			fontSize: 18,
			color: contrast,
			marginLeft: 30,
			marginRight: 30
		},
		headerTitleAlign: 'center',
		headerBackImage: () => <Icon name="chevron-left" type="feather" color={contrast} size={26} />
	};

	const noHeader = { headerShown: false };
    const headerTitle = ({ route }) => ({ title: route.params.title });
	return (
		<Stack.Navigator
			initialRouteName="bottom-tab"
			headerMode="screen"
			screenOptions={screenOptions}>
			<Stack.Screen name="bottom-tab" component={BottomTabNav} options={noHeader} />
			<Stack.Screen name="playlist" component={ShowPlaylistScreen} options={headerTitle} />
			<Stack.Screen name="content" component={ShowContent} options={headerTitle}/>
		</Stack.Navigator>
	);
}

export default withTheme(MainStack);
