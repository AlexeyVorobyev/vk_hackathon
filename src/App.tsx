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
import {PANEL_ACHIEVEMENTS, PANEL_HOME, PANEL_MAP, PANEL_USERPROFILE, VIEW_HOME} from "./index";

const App = () => {
	const [activePanel, setActivePanel] = useState<string>('home');
	const user = useSelector((state:RootState) => state.user)

	useAppVkConnection()
	useGetUserInfo()
	useGetAndSendConfig()

	const location = useLocation()

	return (
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout popout={user.loaded && user.is_auth ? undefined : <ScreenSpinner size='large' />}>
							<SplitCol>
								<View id={VIEW_HOME} activePanel={location.getViewActivePanel(VIEW_HOME)!}>
									<UserProfile id={PANEL_USERPROFILE} setActivePanel={setActivePanel}/>
									<Map id={PANEL_MAP} setActivePanel={setActivePanel} />
									<Home id={PANEL_HOME} setActivePanel={setActivePanel}/>
									<Achievements id={PANEL_ACHIEVEMENTS} setActivePanel={setActivePanel}/>
								</View>
							</SplitCol>
							<FixedLayout vertical="bottom">
								<BottomNavigation setActivePanel={setActivePanel}/>
							</FixedLayout>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
	);
}

export default App;
