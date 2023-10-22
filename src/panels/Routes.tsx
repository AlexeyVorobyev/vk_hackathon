import React, {CSSProperties, useState} from 'react';
import {
    Panel,
    PanelHeader,
    FormLayout,
    Slider,
    Div,
    Search,
    CardGrid,
    Header,
    Card, PanelHeaderBack, Title
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";
import {PAGE_USERPROFILE} from "../index";
import {useRouter} from "@happysanta/router";
import {mockRoutesData} from "../mock/mockRoutesData";

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
const ImageCard = ({ imageUrl, price, length, name }) => (
    <Card style={{borderRadius: '10px',overflow:'hidden'}}>
        <div style={imageCardStyle}>
            {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties} /> : null}
            <Title level={'1'} style={{position:'relative', color:"#fff"}}>{name}</Title>
            <Title level={'2'} style={{position:'relative', color:"#fff"}}>Цена: {price} ₽</Title>
            <Title level={'2'} style={{position:'relative', color:"#fff"}}>Длина маршрута: {length} км</Title>
        </div>
    </Card>
);


const Routes = ({id}:{id:string}) => {
    const _maxPrice = Math.max(...mockRoutesData.map((item) => item.price))
    const _maxLength = Math.max(...mockRoutesData.map((item) => item.length))
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(_maxPrice);
    const [maxLength, setMaxLength] = useState(_maxLength);

    const filteredCards = mockRoutesData.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        card.price <= maxPrice &&
        card.length <= maxLength
    );

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}
            >Актуальные маршруты</PanelHeader>

            <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <FormLayout>
                <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Header style={{ flex: 1, marginRight: '10px' }}>Цена: {maxPrice} ₽</Header>
                    <div style={{ flex: 2 }}>
                        <Slider step={1} min={0} max={_maxPrice} value={maxPrice} onChange={setMaxPrice} />
                    </div>
                </Div>

                <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Header style={{ flex: 1, marginRight: '10px' }}>Длина маршрута: {maxLength} км</Header>
                    <div style={{ flex: 2 }}>
                        <Slider step={1} min={0} max={_maxLength} value={maxLength} onChange={setMaxLength} />
                    </div>
                </Div>
            </FormLayout>

            <Div>
                <Header mode="secondary">Актуальные события</Header>
                <CardGrid size="l" style={verticalCardGridStyle as CSSProperties}>
                    {filteredCards.map((card, index) => (
                        <ImageCard
                            key={index} imageUrl={card.image}
                            price={card.price} length={card.length}
                            name={card.name}/>
                    ))}
                </CardGrid>
            </Div>
        </Panel>
    );
}

export default Routes;
