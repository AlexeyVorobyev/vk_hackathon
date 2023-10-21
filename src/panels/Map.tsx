import React, {FC} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


interface IProps {
	id:string
	go:any
}

const Map:FC<IProps> = ({
							id,
							go
						   }) => (
	<Panel id={id}>
		<PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}></PanelHeader>
	</Panel>
);

export default Map;
