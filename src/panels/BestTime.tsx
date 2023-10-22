import React, {CSSProperties, FC, useState} from 'react';
import {
    Panel,
    PanelHeader,
    Div,
    Select,
    Input,
    Cell,
    Group,
    Header,
    Card,
    CardGrid,
    PanelHeaderBack
} from '@vkontakte/vkui';
import {Icon28Users3Outline} from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import {Icon28SunOutline} from '@vkontakte/icons';
import {Icon28SnowflakeOutline} from '@vkontakte/icons';
import {Icon28WaterDropOutline} from '@vkontakte/icons';
import {Icon28LocationMapOutline} from '@vkontakte/icons';
import {PAGE_USERPROFILE} from "../index";
import {useRouter} from "@happysanta/router";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";

const imageCardStyle = {
    width: '100%',
    height: '150px',
    flexShrink: 0,
    borderRadius: '10px',
    boxShadow: '4px 4px 6px 0px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    margin: '1px 0',
};

const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};
const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
// @ts-ignore
const ImageCard = ({imageUrl, price, length}) => (
    <Card>
        <div style={imageCardStyle}>
            {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties}/> : null}
            <div>Цена: {price} ₽</div>
            <div>Длина маршрута: {length} км</div>
        </div>
    </Card>
);

const BestTime: FC<{ id: string }> = ({id}) => {
    const weather = 'солнце';

    let WeatherIcon;
    switch (weather) {
        // @ts-ignore
        case 'снег':
            WeatherIcon = <Icon28SnowflakeOutline/>;
            break;
        case 'солнце':
            WeatherIcon = <Icon28SunOutline/>;
            break;
        // @ts-ignore
        case 'дождь':
            WeatherIcon = <Icon28WaterDropOutline/>;
            break;
        default:
            WeatherIcon = null;
    }

    const cards = [
        {
            url: "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
            name: "Карточка 1",
            price: 50,
            length: 45
        },
        {
            url: "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
            name: "Карточка 2",
            price: 80,
            length: 70
        },
    ];

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
            >Лучшее Время</PanelHeader>

            <Div>
                <Header mode="primary">Помощь в использовании:</Header>
                <ol>
                    <li>Расскажите, куда вы собираетесь, указав место и дату</li>
                    <li>Наш алгоритм покажет вам, в какое время лучше выходить и даст совет, что надеть!</li>
                </ol>
            </Div>

            <Div>
                <Select
                    // @ts-ignore
                    top="Место/мероприятие" placeholder="Выберите геолокацию..."
                    style={{marginBottom: '16px'}}></Select>
                <Input
                    // @ts-ignore
                    top="Дата" type="date" placeholder="__.__.____"></Input>
            </Div>

            <Group header={<Header mode="secondary">Оценка</Header>}>
                <Cell
                    before={WeatherIcon}
                    // @ts-ignore
                    description="Ростовская область"
                >
                    Погода: 25° солнечно, ожидается снег
                </Cell>
                <Cell
                    before={<Icon28Users3Outline/>}
                >
                    Среднее кол-во людей: Дофига
                </Cell>
                <Cell
                    before={<Icon28LocationMapOutline/>}
                >
                    Предстоящие экскурсии: Дофига
                </Cell>

                <CardGrid size="l" style={verticalCardGridStyle as CSSProperties}>
                    {cards.map((card, index) => (
                        <ImageCard key={index} imageUrl={card.url} price={card.price} length={card.length}/>
                    ))}
                </CardGrid>


            </Group>
        </Panel>
    );
}

export default BestTime;
