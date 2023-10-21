import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import {useAppVkConnection} from "./utils/useAppVkConnection";
import {useGetUserInfo} from "./utils/useGetUserInfo";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./redux/store/store";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const user = useSelector((state:RootState) => state.user)

	useAppVkConnection()
	useGetUserInfo()

	const go = (e:any) => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout popout={user.id ? null : <ScreenSpinner size='large' />}>
							<SplitCol>
								<View activePanel={activePanel}>
									<Home id='home' go={go} />
								</View>
							</SplitCol>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
	);
}

export default App;
