import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import mmrgl from 'mmr-gl';

import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {useRouter} from "@happysanta/router";
import {PAGE_HOME} from "../index";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";


interface IProps {
    id: string
}

const Map: FC<IProps> = ({
                             id,
                         }) => {

    const router = useRouter()

    useEffect(() => {
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
    }, [])

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_HOME)}/>}>Карта</PanelHeader>
            <div id="map" style={{width: '100vw', height: '100dvh'}}/>
        </Panel>
    )
}

export default Map;
