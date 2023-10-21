import React, {CSSProperties, FC} from 'react';
import {View, Panel, Gallery, PanelHeader, Group, CardGrid, Header, Button, useAppearance} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28PlaneOutline, Icon28CompassOutline, Icon28Place, Icon28Attachments, Icon28Story, Icon28Clock} from '@vkontakte/icons';

const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};


const Slide = ({ imageUrl }:{imageUrl:string}) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties} /> : null}
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

const ShadowBlock = ({ icon }:{icon:any}) => {

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
            {React.cloneElement(icon, { style: IconStyle })}
        </div>
    );
}

const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
const icons = [
    <Icon28PlaneOutline />,
    <Icon28CompassOutline />,
    <Icon28Place />,
    <Icon28Attachments />,
    <Icon28Story />,
    <Icon28Clock />,
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


const ImageCard = ({ imageUrl }:{imageUrl:string}) => (
    <div style={imageCardStyle}>
        {imageUrl ? <img src={imageUrl} alt="" style={imageStyleInCard as CSSProperties} /> : null}
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
    id:string,
    setActivePanel: React.Dispatch<React.SetStateAction<string>>
}
const Home:FC<IProps> = ({
                                id,
                                setActivePanel
                            }) => {
    const imageUrls = [
        "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
        "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
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
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>

            <Group >
                <Gallery slideWidth="90%" bullets="dark" style={customGalleryStyles}>
                    <Slide imageUrl="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663155867_60-mykaleidoscope-ru-p-yezhik-veselii-krasivo-61.jpg" />
                    <Slide imageUrl="https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg" />
                    <Slide imageUrl="https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg" />
                </Gallery>
            </Group>
            <Group mode="plain" style={mainContentStyle}>
                <CardGrid size="m" style={{ ...cardGridContainerStyle, display: 'flex', flexWrap: 'wrap' }}>
                    {[...Array(6)].map((_, index) => (
                        <Button
                            key={index}
                            style={buttonStyle}
                            onClick={() => { /*код обработки нажатия */ }}
                        >
                            <ShadowBlock icon={icons[index % icons.length]} />
                        </Button>
                    ))}
                </CardGrid>

                <Header mode="secondary" style={{ fontSize: '25px' }}>Актуальные события</Header>

                <CardGrid size="m" style={verticalCardGridStyle as CSSProperties}>
                    {imageUrls.map((url, index) => (
                        <ImageCard key={index} imageUrl={url} />
                    ))}
                </CardGrid>
                <Header mode="secondary" style={{ fontSize: '25px' }}>Маршруты друзей</Header>

                <CardGrid size="m" style={verticalCardGridStyle as CSSProperties}>
                    {imageUrls.map((url, index) => (
                        <ImageCard key={index} imageUrl={url} />
                    ))}
                </CardGrid>
            </Group>
        </Panel>
    );
};

export default Home;
