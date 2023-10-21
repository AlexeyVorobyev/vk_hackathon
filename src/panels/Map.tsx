import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import mmrgl from 'mmr-gl';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


interface IProps {
	id:string
	setActivePanel:any
}

const Map:FC<IProps> = ({
							id,
							setActivePanel
						   }) => {

	useEffect( () => {
		mmrgl.accessToken = '25d8d6a2246d7544607224e6b41fc8019a010d3ba73f85d03ed8ffda25b97205';

		const map = new mmrgl.Map({
			container: 'map',
			zoom: 8,
			center: [37.6165, 55.7505],
			style: 'mmr://api/styles/main_style.json',
			hash: true,
		})

		return () => {
			if (map) map.remove();
		}
	},[])

	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('home')}/>}></PanelHeader>
			<div id="map" style={{ width: '100%', height: '600px'}} />
		</Panel>
	)
}

export default Map;
