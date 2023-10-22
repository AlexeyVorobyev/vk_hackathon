import React, {CSSProperties, useState} from 'react';
import {Button, Card, CardGrid, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack,} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import cardImage from './../img/cardpay.png';
import {PAGE_USERPROFILE} from "../index";
import {useRouter} from "@happysanta/router";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";


const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
const ImageCard = ({imageUrl}: { imageUrl: string }) => (
    <div style={imageCardStyle}>
        {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties}/> : null}
    </div>
);
const imageCardStyle = {
    width: '315px',
    height: '140px',
    flexShrink: 0,
    borderRadius: '10px',
    boxShadow: '4px 4px 6px 0px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    margin: '10px 0',
};
const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};
const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
};

const scrollButtonItemStyle = {
    flex: 'none',
    marginRight: '10px',
};

const activeButtonStyle = {
    backgroundColor: '#2D81E0',
    color: '#fff',
};

const Cards = ({id}:{id:string}) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const imagesForButtons = {
        'Все': ["https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg", "https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg", "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg"],
        'Отдых': ["https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg", "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg"],
        'Дорога': ["https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg", "https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg"],
        'Еда': ["https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg", "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg"],
        'Кино': ["https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg", "https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg"],
        'Театры': ["https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg", "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg"],
        'Магазины': ["https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg", "https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg"]
    };


    // @ts-ignore
    const imageUrls = activeButton ? imagesForButtons[activeButton] : [];

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom: BOTTOM_PADDING_GLOBAL, height: '100vh'}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
            >VK pay</PanelHeader>

            <Div>
                <Card mode="shadow">
                    <div style={{padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={cardImage} alt="Карта" style={{width: '203px', height: '126px', flexShrink: 0}}/>
                    </div>
                </Card>


            </Div>


            <Group>
                <Header mode="secondary" style={{fontSize: '25px'}}>Популярные операции</Header>
                <Div style={scrollContainerStyle as CSSProperties}>
                    {Object.keys(imagesForButtons).map((buttonLabel) => (
                        <Button
                            key={buttonLabel}
                            mode="primary"
                            size="l"
                            style={activeButton === buttonLabel ? {...scrollButtonItemStyle, ...activeButtonStyle} : scrollButtonItemStyle}
                            onClick={() => setActiveButton(buttonLabel)}
                        >
                            {buttonLabel}
                        </Button>
                    ))}
                </Div>
            </Group>

            <Group>
                <Header mode="secondary" style={{fontSize: '25px'}}>Актуальные события</Header>
                <CardGrid size="m" style={verticalCardGridStyle as CSSProperties}>
                    {imageUrls.map((url: string, index: React.Key | null | undefined) => (
                        <ImageCard key={index} imageUrl={url}/>
                    ))}
                </CardGrid>
            </Group>
        </Panel>
    );
}

export default Cards;
