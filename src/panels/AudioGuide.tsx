import React, {FC} from 'react';
import {Panel, PanelHeader, Div, Select, Card, CardGrid, Header, Cell, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {useRouter} from "@happysanta/router";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";
import {PAGE_USERPROFILE} from "../index";

const AudioGuide:FC<{id:string}> = ({id}) => {

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom: BOTTOM_PADDING_GLOBAL, height: '100vh'}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
            >Аудиогид</PanelHeader>

            <Div>
                <Header mode="primary">Помощь в использовании:</Header>
                <ol>
                    <li>Укажите свое местоположение или достопримечательность</li>
                    <li>Мы подберем для вас актуальные аудиогиды для того, чтобы узнать что-то новое!</li>
                </ol>
            </Div>

            <Div>
                <Select
                    // @ts-ignore
                    top="Место/мероприятие" placeholder="Выберите геолокацию..."></Select>
            </Div>

            <Div>
                <Header mode="secondary">Актуальные гиды</Header>
                <CardGrid size="m">
                    <Card
                        // @ts-ignore
                        size="l" mode="shadow">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '172px' }}>
                            <Avatar src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663107489_22-mykaleidoscope-ru-p-rostov-na-donu-dostoprimechatelnosti-vkont-24.jpg" size={96} />
                            <Cell
                                // @ts-ignore
                                description="4 ч. 10 мин.   2 км.">Ростов папа</Cell>
                        </div>
                    </Card>
                    <Card
                        // @ts-ignore
                        size="l" mode="shadow">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '172px' }}>
                            <Avatar src="https://static.tonkosti.ru/tonkosti/table_img/g192/0c0c/264951800.jpg" size={96} />
                            <Cell
                                // @ts-ignore
                                description="1 ч. 5 мин.   1 км.">Ростов дом</Cell>
                        </div>
                    </Card>
                </CardGrid>
            </Div>
        </Panel>
    );
}

export default AudioGuide;
