import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import PlaylistsScreen from '../screens/Playlists';
import ArtistsScreen from '../screens/Artists';
import AlbumsScreen from '../screens/Albums';
import FoldersScreen from '../screens/Folders';

const screenProps = {
	playlists: { component: PlaylistsScreen, options: { title: 'Playlists' } },
	artists: { component: ArtistsScreen, options: { title: 'Nghệ sĩ' } },
	albums: { component: AlbumsScreen, options: { title: 'Album' } },
	folders: { component: FoldersScreen, options: { title: 'Hợp âm' } }
};

function TopMaterialTabNav(props) {
	const TopTabs = createMaterialTopTabNavigator();
	const { foreground, background, contrast } = props.theme;
	const tabBarOptions = {
		activeTintColor: contrast,
		upperCaseLabel: false,
		tabStyle: { width: 92 },
		scrollEnabled: true,
		labelStyle: {
			fontFamily: 'ProductSans',
			fontSize: 16,
			textTransform: 'capitalize'
		},
		style: {
			elevation: 0,
			marginLeft: 10,
			backgroundColor: background
		},
		indicatorStyle: {
			width: 60,
			marginLeft: 16,
			backgroundColor: foreground
		},
		allowFontScaling: false
	};

	return (
		<TopTabs.Navigator tabBarOptions={tabBarOptions}>
			{props.tabOrder.map((tab) => (
				<TopTabs.Screen name={tab} {...screenProps[tab]} key={tab} />
			))}
		</TopTabs.Navigator>
	);
}

function mapStateToProps(state) {
	return { tabOrder: state.settings.topTabs };
}

export default connect(mapStateToProps, null)(withTheme(TopMaterialTabNav));
