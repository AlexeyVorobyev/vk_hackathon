import React, {FC} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


interface IProps {
	id:string
	go:any
}

const Persik:FC<IProps> = ({
							id,
							go
						   }) => (
	<Panel id={id}>
		<PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}></PanelHeader>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
