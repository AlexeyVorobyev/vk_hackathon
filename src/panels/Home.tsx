import React, {CSSProperties, FC, useEffect, useState} from 'react';
import {
    View,
    Panel,
    Gallery,
    PanelHeader,
    Group,
    CardGrid,
    Header,
    Button,
    useAppearance,
    Card,
    Title
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
    Icon28PlaneOutline,
    Icon28CompassOutline,
    Icon28Place,
    Icon28Attachments,
    Icon28Story,
    Icon28Clock
} from '@vkontakte/icons';
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";
import bridge from "@vkontakte/vk-bridge";
import {BASE_HELP_IMAGE} from "../img/base";
import {useRouter} from "@happysanta/router";
import {useActions} from "../redux/hooks/useActions";
import {PAGE_BESTTIMES, PAGE_MAP, PAGE_ROUTES, PAGE_SHOP, PAGE_USERPROFILE} from "../index";
import {mockRoutesData} from "../mock/mockRoutesData";


const Slide = ({imageUrl}: { imageUrl: string }) => (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties}/> : null}
    </div>
);


const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '314px',
    height: '300px',
    flexShrink: 0,
    borderRadius: '10px',
    overflow: 'hidden',
};

const IconStyle = {
    transform: 'scale(1.5)',
};

const ShadowBlock = ({icon}: { icon: any }) => {

    const appearance = useAppearance();

    const shadowBlockStyle = {
        width: '70px',
        height: '70px',
        flexShrink: 0,
        background: appearance === 'light' ? '#A4DDFF' : "#fff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: appearance === 'light' ? "#fff" : "#000",
        fontSize: '50px',
        margin: 0,
    };

    return (
        <div style={shadowBlockStyle}>
            {React.cloneElement(icon, {style: IconStyle})}
        </div>
    );
}

const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const mainContentStyle = {
    paddingBottom: '61px',
};

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

// @ts-ignore
const ImageCard = ({ imageUrl, price, length, name,card,date }) => {

    const router = useRouter()
    const {setChosenRoute} = useActions()

    return (
        <Card
            style={{borderRadius: '10px',overflow:'hidden'}}
            onClick={() => {
                router.pushPage(PAGE_MAP)
                setChosenRoute(card)
            }}
        >
            <div style={imageCardStyle}>
                {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties} /> : null}
                <Title level={'2'} style={{position:'relative', color:"#fff"}}>{name}</Title>
                <Title level={'3'} style={{position:'relative', color:"#fff"}}>Дата: {date}</Title>
            </div>
        </Card>
    );
}

const customGalleryStyles = {
    height: '200px',
    borderRadius: '10px'
};

interface IProps {
    id: string,
}

const Home: FC<IProps> = ({
                              id,
                          }) => {

    const appearance = useAppearance();

    const buttonStyle = {
        margin: '5px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appearance === 'light' ? '#A4DDFF' : "#fff",
        borderRadius: '10px',
    };

    useEffect(() => {
        if (!!sessionStorage.getItem('start')) return
        bridge.send('VKWebAppShowSlidesSheet', {
            slides: [
                {
                    media: {
                        blob: BASE_HELP_IMAGE,
                        type: 'image'
                    },
                    title: 'Помощь в поиске удобного маршрута',
                    subtitle: 'Расскажите нам о своих предпочтениях и планах, мы поможем вам построить самый удобный маршрут!'
                },
                {
                    media: {
                        blob: BASE_HELP_IMAGE,
                        type: 'image'
                    },
                    title: 'Создание красочных фотографий',
                    subtitle: 'Покажите нам место, где вы хотите сфотографироваться и наш помощник предложит вам, как лучше это сделать!'
                },
                {
                    media: {
                        blob: BASE_HELP_IMAGE,
                        type: 'image'
                    },
                    title: 'Рекомендации к поездке',
                    subtitle: 'Не знаете что взять с собой или не уверены? Расскажите, куда вы едете и мы подскажем вам, что лучше собрать!'
                }

            ]})
            .then((data) => {
                if (data.result) {
                    // Слайды показаны
                }
            })
            .catch((error) => {
                // Ошибка
                console.log(error);
            });
        sessionStorage.setItem('start','1')
    },[])

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader>Главная</PanelHeader>

            <Group style={{
                display:''
            }}>

            </Group>

            <Group>
                <Gallery slideWidth="90%" bullets="dark" style={customGalleryStyles}>
                    {mockRoutesData.map((card,index) => {
                        return (
                            <ImageCard
                                key={index} imageUrl={card.image}
                                price={card.price} length={card.length}
                                name={card.name}
                                card={card}
                                date={'02.03.23 - 14.03.23'}
                            />
                        )
                    })}
                </Gallery>
            </Group>

            <Group>
                <div style={buttonContainerStyle}>
                    {/* Первая кнопка с картинкой слева */}
                    <Button
                        style={buttonStyle1}
                        onClick={() => {
                            bridge.send('VKWebAppShowWallPostBox', {
                                message: 'Я использую классное приложение для путешествий с друзьями! Присоединяйся и ты!',
                                attachments: 'https://vk.com/app51775552_268110017'
                            })
                                .then((data) => {
                                    if (data.post_id) {
                                        // Запись размещена
                                    }
                                })
                                .catch((error) => {
                                    // Ошибка
                                    console.log(error);
                                });
                            router.pushPage(PAGE_USERPROFILE)
                        }}
                    >
                        <div style={buttonContentWrapper}>
                            <img src="https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1efokIIGV99in0vFS68JDeklRvvFtiNnM" alt="" style={buttonImageStyle} />
                            <span style={buttonText}>Пригласи своих друзей в путешествие!</span>
                        </div>
                    </Button>

                    {/* Вторая кнопка без картинки */}
                    <Button
                        style={buttonStyle2}
                        onClick={() => {
                            router.pushPage(PAGE_SHOP)
                        }}
                    >
                        <span style={buttonText}>У вас на счету: 250⚡️</span>
                    </Button>
                </div>

                <div style={buttonContainerStyle}>
                    {/* Третья кнопка с картинкой справа */}
                    <Button
                        style={buttonStyle3}
                        onClick={() => {
                            router.pushPage(PAGE_SHOP)
                        }}
                    >
                        <div style={buttonContentWrapper}>
                            <img src="https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1jQAjzgNfB4z9jQTS6voARnEtgw99rYLo" alt="" style={buttonImageStyle} />
                            <span style={buttonText}>У вас остался один купон, успейте его потратить!</span>
                        </div>
                    </Button>

                    {/* Четвертая кнопка с картинкой справа */}
                    <Button
                        style={buttonStyle4}
                        onClick={() => {
                            router.pushPage(PAGE_ROUTES)
                        }}
                    >
                        <div style={buttonContentWrapper}>
                            <img src="https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1C-kMtGL5jojLH_yLFQCJuUclZVV6HVcO" alt="" style={buttonImageStyle} />
                            <span style={buttonText}>Новые путешествия уже ждут вас</span>
                        </div>
                    </Button>
                </div>

            </Group>

            <Group mode="plain" style={mainContentStyle}>
                <Header mode="secondary" style={{fontSize: '25px'}}>Актуальные события</Header>

                <CardGrid size="l" style={verticalCardGridStyle as CSSProperties}>
                    {mockRoutesData.map((card,index) => {
                        return (
                            <ImageCard
                                key={index} imageUrl={card.image}
                                price={card.price} length={card.length}
                                name={card.name}
                                card={card}
                                date={'02.03.23 - 14.03.23'}
                            />
                        )
                    })}
                </CardGrid>
                <Header mode="secondary" style={{fontSize: '25px'}}>Маршруты друзей</Header>

                <CardGrid size="l" style={verticalCardGridStyle as CSSProperties}>
                    {mockRoutesData.map((card,index) => {
                        return (
                            <ImageCard
                                key={index} imageUrl={card.image}
                                price={card.price} length={card.length}
                                name={card.name}
                                card={card}
                                date={'02.03.23 - 14.03.23'}
                            />
                        )
                    })}
                </CardGrid>
            </Group>
        </Panel>
    );
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
} as CSSProperties;
const buttonText = {
    whiteSpace: 'normal',
    maxWidth: '60%'
} as CSSProperties;
const buttonStyle1 = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px',

    width: '65%',
    height: '100px',
    flexShrink: 0,
    borderRadius: '10px',
    background: '#2688EB',
    color: 'white',
} as CSSProperties;

const buttonContentWrapper = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
} as CSSProperties;
const buttonStyle2 = {
    width: '33%',
    height: '100px',
    borderRadius: '10px',
    background: '#3CB2EE',
    color: 'white',
} as CSSProperties;
const buttonImageStyle = {
    width: '36%',
    marginRight: '10px',
} as CSSProperties;

const buttonStyle3 = {
    width: '48%',
    height: '100px',
    flexShrink: 0,
    borderRadius: '10px',
    background: '#BBE5FF',
    color: 'white',
} as CSSProperties;

const buttonStyle4 = {
    width: '50%',
    height: '100px',
    borderRadius: '10px',
    background: '#3CB2EE',
    color: 'white',
} as CSSProperties;
export default Home;
