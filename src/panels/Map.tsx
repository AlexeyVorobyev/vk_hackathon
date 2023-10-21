import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import mmrgl from 'mmr-gl';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


interface IProps {
	id:string
	go:any
}

const Map:FC<IProps> = ({
							id,
							go
						   }) => {

	useEffect( () => {
		mmrgl.accessToken = 'accessToken';
		mmrgl.baseApiUrl = 'https://maps.vk.com/api';

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
			<PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}></PanelHeader>
			<div id="map" style={{ width: '100%', height: '600px'}} />
		</Panel>
	)
}

export default Map;
