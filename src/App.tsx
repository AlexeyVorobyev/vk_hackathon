import React, { useState} from 'react';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	FixedLayout
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Map from "./panels/Map";
import {useAppVkConnection} from "./utils/useAppVkConnection";
import {useGetUserInfo} from "./utils/useGetUserInfo";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store/store";
import Home from "./panels/Home";
import BottomNavigation from "./components/BottomNavigation";
import UserProfile from "./panels/UserProfile";
import {useGetAndSendConfig} from "./utils/useGetAndSendConfig";
import AchievementsPage from "./panels/Achievements";
import Achievements from "./panels/Achievements";
import {useLocation} from "@happysanta/router";
import {
	PANEL_ACHIEVEMENTS,
	PANEL_CARDS,
	PANEL_HOME,
	PANEL_MAP, PANEL_ROUTES,
	PANEL_SHOP,
	PANEL_USERPROFILE,
	VIEW_HOME
} from "./index";
import Shop from "./panels/Shop";
import Cards from "./panels/Cards";
import Routes from "./panels/Routes";

const App = () => {
	const user = useSelector((state:RootState) => state.user)

	useAppVkConnection()
	useGetUserInfo()
	useGetAndSendConfig()

	const location = useLocation()

	return (
			<ConfigProvider appearance={'light'}>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout popout={user.loaded && user.is_auth ? undefined : <ScreenSpinner size='large' />}>
							<View id={VIEW_HOME} activePanel={location.getViewActivePanel(VIEW_HOME)!}>
								<UserProfile id={PANEL_USERPROFILE}/>
								<Map id={PANEL_MAP}/>
								<Home id={PANEL_HOME}/>
								<Achievements id={PANEL_ACHIEVEMENTS}/>
								<Shop id={PANEL_SHOP}/>
								<Cards id={PANEL_CARDS}/>
								<Routes id={PANEL_ROUTES}/>
							</View>
							<FixedLayout vertical="bottom">
								<BottomNavigation/>
							</FixedLayout>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
	);
}

export default App;
