import React, {CSSProperties, FC, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import mmrgl, {LngLatLike} from 'mmr-gl';

import {Button, Card, CardGrid, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack, Search} from '@vkontakte/vkui';
import {useRouter} from "@happysanta/router";
import {PAGE_HOME} from "../index";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {IRouteData} from "../mock/mockRoutesData";
import {useConstructRouteMutation} from "../redux/api/map.api";
import {IConstructRoutePayload} from "../redux/api/types/map";
import {Icon12BookmarkOutline, Icon28StorefrontOutline} from '@vkontakte/icons';

const cards = [
    {
        url: "https://irs1.4sqi.net/img/general/original/42178743_ZYdO0rub7Yux9at6VMsg7UlZnYowXX_0EVV9bw4v6Rw.jpg",
        name: "Карточка 1",
        price: 50,
        length: 45,
        type: "restaurant"
    },
    {
        url: "https://irs1.4sqi.net/img/general/original/42178743_ZYdO0rub7Yux9at6VMsg7UlZnYowXX_0EVV9bw4v6Rw.jpg",
        name: "Карточка 2",
        price: 80,
        length: 70,
        type: "pharmacy1"
    },
];

const imageCardStyle = {
    width: '100%',
    height: '150px',
    flexShrink: 0,
    borderRadius: '10px',
    boxShadow: '4px 4px 6px 0px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
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
    // alignItems: 'flex-start',  // change this line
};

// @ts-ignore
const ImageCard = ({ imageUrl, price, length }) => (
    <Card>
        <div style={imageCardStyle}>
            {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties} /> : null}
            <div>Цена: {price} ₽</div>
            <div>Длина маршрута: {length} км</div>
        </div>
    </Card>
);

interface IProps {
    id: string
}

const Map: FC<IProps> = ({
                             id,
                         }) => {

    const router = useRouter()

    const mapState = useSelector((state: RootState) => state.map)

    const [createRoute] = useConstructRouteMutation()

    useEffect(() => {
        if (mapState.chosenRoute) {
            console.log(mapState.chosenRoute)
        }
    }, [mapState.chosenRoute])

    useEffect(() => {

        const accessToken = '25d8d6a2246d7544607224e6b41fc8019a010d3ba73f85d03ed8ffda25b97205'
        mmrgl.accessToken = accessToken;

        const map = new mmrgl.Map({
            container: 'map',
            zoom: 8,
            center: [39.42, 47.13],
            style: 'mmr://api/styles/main_style.json',
            hash: true,
        })

        if (!mapState.chosenRoute) return

        const pathPoints = {
            "type": "FeatureCollection",
            "features": mapState.chosenRoute.places.map((place) => {
                return {
                    "type": "Feature",
                    'geometry': {
                        "type": "Point",
                        "coordinates": [place.coordinates[1], place.coordinates[0]]
                    }
                }
            })
        };

        const pathLine = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": mapState.chosenRoute.places.map((place) => {
                        return [place.coordinates[1], place.coordinates[0]]
                    })
                }
            }]
        }


        map.on('load', function () {
            map.loadImage(
                'https://maps.vk.com/api/styles/pins/blue_target.png',
                function (error: any, image: any) {
                    console.log(pathPoints)
                    if (error) {
                        throw error;
                    }
                    map.addImage('custom_pin', image);
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": pathPoints
                        },
                        "layout": {
                            "icon-image": "custom_pin",
                            "icon-size": 1
                        }
                    });
                }
            );
        });

        map.on('load', function () {

            const paramsConstructRoute = {
                locations: mapState.chosenRoute?.places.map((item) => {
                    return {
                        lat: item.coordinates[1],
                        lon: item.coordinates[0]
                    }
                }),
                costing: "auto",
                costing_options:
                    {
                        auto:
                            {
                                use_border_crossing: 0
                            }
                    },
                units: "kilometers",
                id: 'some_route'
            } as IConstructRoutePayload

            console.log(paramsConstructRoute,'test')

            createRoute(paramsConstructRoute)
                .then((response) => {
                    console.log('constructed_route', response)
                    map.addLayer({
                        'id': 'route',
                        'type': 'line',
                        'source': {
                            'type': 'geojson',
                            'data': pathLine
                        },
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#BBE5FF',
                            'line-width': 8
                        }
                    });
                    map.setCenter(pathLine.features[0].geometry.coordinates[0] as LngLatLike)
                })
                .catch((error) => {
                    console.log(error)
                })

        });

        return () => {
            if (map) map.remove();
        }
    }, [mapState.chosenRoute])

    const [showDetails, setShowDetails] = React.useState(false);
    const [isRestaurantPressed, setIsRestaurantPressed] = React.useState(false);
    const [pressedButtons, setPressedButtons] = React.useState({
        restaurant: false,
        pharmacy1: false,
        pharmacy2: false,
        cafe: false
    });

    // @ts-ignore
    const handleButtonClick = (buttonName) => {
        setPressedButtons(prevState => ({
            ...prevState,
            // @ts-ignore
            [buttonName]: !prevState[buttonName]
        }));
    };
    const filteredCards = cards.filter(card =>
        (pressedButtons.restaurant && card.type === 'restaurant') ||
        (pressedButtons.pharmacy1 && card.type === 'pharmacy1') ||
        (pressedButtons.pharmacy2 && card.type === 'pharmacy2') ||
        (pressedButtons.cafe && card.type === 'cafe')
    );

    return (
        <Panel id={id} style={{paddingBottom: BOTTOM_PADDING_GLOBAL, height: '100vh'}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_HOME)}/>}>Карта</PanelHeader>

            <div id="map" style={{width: '100vw', height: '100dvh'}}/>

            {showDetails ? (
                <Group style={{
                    position: 'fixed',
                    top:0,
                    left:0,
                    width:'100%',
                    height:'100vh',
                    overflowX:'scroll',
                    zIndex:10000,
                    background:'white',
                    paddingBottom:BOTTOM_PADDING_GLOBAL
                }}>
                    <Div>
                        <Search placeholder="Поиск"/>
                    </Div>

                    <Group>
                        <Header mode="secondary">Полезные </Header>
                        <Div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '0',
                            marginBottom: '0',
                        }}>
                            {/* Кнопки */} <Button
                            before={<Icon28StorefrontOutline/>}
                            mode="outline"
                            style={{
                                borderRadius: '20px',
                                borderColor: '#528BFF',
                                backgroundColor: pressedButtons.restaurant ? '#528BFF' : '#E5EEFF',
                                color: pressedButtons.restaurant ? '#FFFFFF' : '#528BFF',
                                padding: '5px 10px',
                                minWidth: 'max-content',
                            }}
                            onClick={() => handleButtonClick('restaurant')}
                        >
                            Рестораны и кафе
                        </Button>
                            <Button
                                before={<Icon12BookmarkOutline/>}
                                mode="outline"
                                style={{
                                    borderRadius: '20px',
                                    borderColor: '#528BFF',
                                    backgroundColor: pressedButtons.pharmacy1 ? '#528BFF' : '#E5EEFF',
                                    color: pressedButtons.pharmacy1 ? '#FFFFFF' : '#528BFF',
                                    padding: '5px 10px',
                                    minWidth: 'max-content',
                                }}
                                onClick={() => handleButtonClick('pharmacy1')}
                            >
                                Аптеки
                            </Button>
                            <Button
                                before={<Icon12BookmarkOutline/>}
                                mode="outline"
                                style={{
                                    borderRadius: '20px',
                                    borderColor: '#528BFF',
                                    backgroundColor: pressedButtons.pharmacy2 ? '#528BFF' : '#E5EEFF',
                                    color: pressedButtons.pharmacy2 ? '#FFFFFF' : '#528BFF',
                                    padding: '5px 10px',
                                    minWidth: 'max-content',
                                }}
                                onClick={() => handleButtonClick('pharmacy2')}
                            >
                                Магазин
                            </Button>
                            <Button
                                before={<Icon28StorefrontOutline/>}
                                mode="outline"
                                style={{
                                    borderRadius: '20px',
                                    borderColor: '#528BFF',
                                    backgroundColor: pressedButtons.cafe ? '#528BFF' : '#E5EEFF',
                                    color: pressedButtons.cafe ? '#FFFFFF' : '#528BFF',
                                    padding: '5px 10px',
                                    minWidth: 'max-content',
                                }}
                                onClick={() => handleButtonClick('cafe')}
                            >
                                Театр и кино
                            </Button>
                        </Div>

                    </Group>

                    <Group>
                        <Div>
                            <Header mode="secondary" style={{marginTop: '0'}}>Актуальные события</Header>
                            <CardGrid size="l" style={{...verticalCardGridStyle, margin: '0', padding: '0'} as CSSProperties}>
                                {filteredCards.map((card, index) => (
                                    <ImageCard key={index} imageUrl={card.url} price={card.price} length={card.length}/>
                                ))}
                            </CardGrid>
                        </Div>
                    </Group>

                    <Button onClick={() => setShowDetails(false)} style={
                        {
                            marginTop: '20px',
                            marginBottom:BOTTOM_PADDING_GLOBAL,
                        }
                    }>Закрыть</Button>
                </Group>
            ) : (
                <Div onClick={() => setShowDetails(true)} style={{
                    height: '110px',
                    backgroundColor: 'white',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTop: '1px solid #e7e7e7',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    zIndex:100
                }}>
                    Поднимите для деталей
                </Div>
            )}
        </Panel>
    )
}

export default Map;
