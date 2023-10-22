import React, {CSSProperties, FC} from 'react';
import {View, Panel, Gallery, PanelHeader, Group, CardGrid, Header, Button, useAppearance} from '@vkontakte/vkui';
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

const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};


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
const icons = [
    <Icon28PlaneOutline/>,
    <Icon28CompassOutline/>,
    <Icon28Place/>,
    <Icon28Attachments/>,
    <Icon28Story/>,
    <Icon28Clock/>,
];
const cardGridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
};
const mainContentStyle = {
    paddingBottom: '61px',
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
    const imageUrls = [
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/DSC07437-%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D1%8C.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Grand_Cascade_of_Peterhof_01.jpg/1200px-Grand_Cascade_of_Peterhof_01.jpg"
    ];

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

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader>Главная</PanelHeader>

            <Group>
                <Gallery slideWidth="90%" bullets="dark" style={customGalleryStyles}>
                    <Slide
                        imageUrl="https://upload.wikimedia.org/wikipedia/commons/c/c1/DSC07437-%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D1%8C.jpg"/>
                    <Slide imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Grand_Cascade_of_Peterhof_01.jpg/1200px-Grand_Cascade_of_Peterhof_01.jpg"/>
                    <Slide imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Grand_Cascade_of_Peterhof_01.jpg/1200px-Grand_Cascade_of_Peterhof_01.jpg"/>
                </Gallery>
            </Group>
            <Group mode="plain" style={mainContentStyle}>
                <CardGrid size="m" style={{...cardGridContainerStyle, display: 'flex', flexWrap: 'wrap'}}>
                    {[...Array(6)].map((_, index) => (
                        <Button
                            key={index}
                            style={buttonStyle}
                            onClick={() => { /*код обработки нажатия */
                            }}
                        >
                            <ShadowBlock icon={icons[index % icons.length]}/>
                        </Button>
                    ))}
                </CardGrid>

                <Header mode="secondary" style={{fontSize: '25px'}}>Актуальные события</Header>

                <CardGrid size="m" style={verticalCardGridStyle as CSSProperties}>
                    {imageUrls.map((url, index) => (
                        <ImageCard key={index} imageUrl={url}/>
                    ))}
                </CardGrid>
                <Header mode="secondary" style={{fontSize: '25px'}}>Маршруты друзей</Header>

                <CardGrid size="m" style={verticalCardGridStyle as CSSProperties}>
                    {imageUrls.map((url, index) => (
                        <ImageCard key={index} imageUrl={url}/>
                    ))}
                </CardGrid>
            </Group>
        </Panel>
    );
};

export default Home;
