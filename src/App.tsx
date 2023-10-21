import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Map from "./panels/Map";
import {useAppVkConnection} from "./utils/useAppVkConnection";
import {useGetUserInfo} from "./utils/useGetUserInfo";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./redux/store/store";
import Example from "./panels/Example";

const App = () => {
	const [activePanel, setActivePanel] = useState<string>('gallery');
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
						<SplitLayout popout={user.id ? undefined : <ScreenSpinner size='large' />}>
							<SplitCol>
								<View activePanel={activePanel}>
									<Home id='home' go={go} />
									{/*<Map id='map' go={go} />*/}
									<Example id='gallery' go={go}/>
								</View>
							</SplitCol>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
	);
}

export default App;
