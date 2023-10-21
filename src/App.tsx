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

const App = () => {
	const [activePanel, setActivePanel] = useState<string>('home');
	const user = useSelector((state:RootState) => state.user)

	useAppVkConnection()
	useGetUserInfo()
	// useGetAndSendConfig()

	return (
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout popout={user.loaded && user.is_auth ? undefined : <ScreenSpinner size='large' />}>
							<SplitCol>
								<View activePanel={activePanel}>
									<UserProfile id='cabinet' setActivePanel={setActivePanel}/>
									<Map id='map' setActivePanel={setActivePanel} />
									<Home id='home' setActivePanel={setActivePanel}/>
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
