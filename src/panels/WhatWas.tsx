import React, {CSSProperties, FC, useState} from 'react';
import {
    Panel,
    PanelHeader,
    Div,
    Button,
    Group,
    Header,
    Avatar,
    Cell,
    Card,
    CardGrid,
    Title,
    PanelHeaderBack
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {mockRoutesData} from "../mock/mockRoutesData";
import {useRouter} from "@happysanta/router";
import {useActions} from "../redux/hooks/useActions";
import {PAGE_MAP, PAGE_USERPROFILE} from "../index";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";

const imageCardStyle = {
    width: '346px',
    height: '150px',
    flexShrink: 0,
    boxShadow: '4px 4px 6px 0px rgba(0, 0, 0, 0.25)',
    margin: '1px 0',
    padding:'20px'
};

const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position:'absolute',
    top:0,
    left:0,
} as CSSProperties;
const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
// @ts-ignore
const ImageCard = ({imageUrl, price, length, name, card}) => {

    const router = useRouter()
    const {setChosenRoute} = useActions()

    return (
        <Card
            style={{borderRadius: '10px', overflow: 'hidden'}}
            onClick={() => {
                router.pushPage(PAGE_MAP)
                setChosenRoute(card)
            }}
        >
            <div style={imageCardStyle}>
                {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties}/> : null}
                <Title level={'1'} style={{position: 'relative', color: "#fff"}}>{name}</Title>
                <Title level={'2'} style={{position: 'relative', color: "#fff"}}>Цена: {price} ₽</Title>
                <Title level={'2'} style={{position: 'relative', color: "#fff"}}>Длина маршрута: {length} км</Title>
            </div>
        </Card>
    );
}

const WhatWas: FC<{ id: string }> = ({id}) => {

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom: BOTTOM_PADDING_GLOBAL, height: '100vh'}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
            >Что здесь было?</PanelHeader>

            <Div>
                <Button size="l" stretched mode="secondary">
                    Добавить фото
                </Button>
            </Div>
            <Div>
                <Header mode="secondary">Вы также можете посетить:</Header>
                <CardGrid size="l" style={verticalCardGridStyle as CSSProperties}>
                    {mockRoutesData.map((card, index) => (
                        <ImageCard
                            key={index} imageUrl={card.image}
                            price={card.price} length={card.length}
                            name={card.name}
                            card={card}
                        />
                    ))}
                </CardGrid>
            </Div>
        </Panel>
    );
}
export default WhatWas
