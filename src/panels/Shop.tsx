import React, {FC} from 'react';
import {Button, Card, CardGrid, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack, Text} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import png5 from './../img/achievements/5.png'
import png6 from './../img/achievements/6.png'
import png7 from './../img/achievements/7.png'
import {PAGE_USERPROFILE} from "../index";
import {useRouter} from "@happysanta/router";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";

const Shop: FC<{ id: string }> = ({id}) => {
    const userBalance = 350;

    const items = [
        {
            icon: png5,
            title: 'Активируйте промокод',
            description: 'потратьте накопленные баллы на промокоды в любимые магазины',
            price: 50
        },
        {
            icon: png6,
            title: 'Новый стикерпак',
            description: 'подарите себя новыми стикерами и выберите лучший пак',
            price: 50
        },
        {
            icon: png7,
            title: 'Скоро в школу',
            description: 'найдите и купите себе обучающие курсы и онлайн уроки'
        }
    ];

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px'}}>
                У вас: {userBalance} ⚡️
            </PanelHeader>

            <Group mode="plain">
                <CardGrid size="l">
                    {items.map((item, index) => (
                        <Card key={index} mode="shadow" style={{padding: '20px', textAlign: 'center'}}>
                            <img src={item.icon} alt={item.title} style={{width: '25%', marginBottom: '20px'}}/>
                            <Div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Header>{item.title}</Header>
                                <Text style={{textAlign: 'center'}}>{item.description}</Text>
                            </Div>
                            <Button
                                mode="primary"
                                size="l"
                                stretched
                                style={{backgroundColor: '#2D81E0', color: '#fff'}}
                            >
                                {item.price ? `${item.price} ⚡️` : 'Приступить'}
                            </Button>
                        </Card>
                    ))}
                </CardGrid>
            </Group>
        </Panel>
    );
}

export default Shop;