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
        'Все': ["https://naytiparu.ru/img/mesta/mesta2349_1630462809.png", "https://sun9-13.userapi.com/impf/c824604/v824604358/2e444/XALTWCGFkfo.jpg?size=1280x853&quality=96&sign=719bfd7573a18d6debf2e2544ccd0ae5&c_uniq_tag=-lHMapNlulR4Z1ExXOco-XLf1GhnTPq3yGStZscxwDM&type=album","https://irs1.4sqi.net/img/general/original/42178743_ZYdO0rub7Yux9at6VMsg7UlZnYowXX_0EVV9bw4v6Rw.jpg"],
        'Отдых': ["https://naytiparu.ru/img/mesta/mesta2349_1630462809.png", "https://hotel-valencia.ru/upload/iblock/797/797ad82e4a6e0686797981232b06243e.jpg"],
        'Дорога': ["https://lifeinrus.ru/wp-content/uploads/2022/02/img-14673187593410.jpg", "https://sun9-13.userapi.com/impf/c824604/v824604358/2e444/XALTWCGFkfo.jpg?size=1280x853&quality=96&sign=719bfd7573a18d6debf2e2544ccd0ae5&c_uniq_tag=-lHMapNlulR4Z1ExXOco-XLf1GhnTPq3yGStZscxwDM&type=album"],
        'Еда': ["https://eda.yandex/images/1380157/3e6cc4c66a95d8c4b6629974ae207006-1100x825.jpg", "https://eda.yandex.ru/images/1380298/371c82806249aabd3fbd0119242f7856-1100x825.jpg"],
        'Кино': ["https://irs1.4sqi.net/img/general/original/42178743_ZYdO0rub7Yux9at6VMsg7UlZnYowXX_0EVV9bw4v6Rw.jpg", "https://avatars.dzeninfra.ru/get-zen_doc/9555919/pub_6412c2083ae231528baddb77_6412e2febc9e7b5c460b6a1a/scale_1200"],
        'Театры': ["https://avatars.mds.yandex.net/get-altay/1371846/2a00000166f7e831b3ba1326c76b5099904a/XXXL", "https://static.gorodzovet.ru/uploads/venue/venuelogo-1503799.jpg"],
        'Магазины': ["https://avatars.mds.yandex.net/get-altay/1588111/2a0000016ca13ac5958e7692f5688f5c4f9e/XXL", "https://arendator.ru/data/editor_imgs/7/abc-editor_img-7547.jpg"]
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
