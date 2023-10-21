import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Map';
import {useAppVkConnection} from "./utils/useAppVkConnection";
import {useGetUserInfo} from "./utils/useGetUserInfo";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [popout, setPopout] = useState<any>(<ScreenSpinner size='large' />);

	useAppVkConnection()
	useGetUserInfo()

	const go = (e:any) => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<Provider store={store}>
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout popout={popout}>
							<SplitCol>
								<View activePanel={activePanel}>
									<Home id='home' go={go} />
									<Persik id='persik' go={go} />
								</View>
							</SplitCol>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		</Provider>
	);
}

export default App;
