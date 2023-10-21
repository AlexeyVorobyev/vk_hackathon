import React, {CSSProperties, FC} from 'react';
import { View, Panel, Gallery, PanelHeader, Group, CardGrid, Header, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {  Icon28PlaneOutline, Icon24Home,Icon28CompassOutline,  Icon28Place, Icon28Attachments, Icon28Story,Icon28Clock} from '@vkontakte/icons';
import { FixedLayout } from '@vkontakte/vkui';

const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '314px',
    height: '169px',
    flexShrink: 0,
    borderRadius: '10px',
    overflow: 'hidden',
};
const bottomNavStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'white',
    borderTop: '1px solid #e7e7e7',
    padding: '8px 0',
};


const Slide = ({ imageUrl }:{imageUrl:string}) => (
    <div style={slideStyle}>
        {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%', height: 'auto' }} /> : null}
    </div>
);
const BottomNavigation = () => {
    const [selectedButton, setSelectedButton] = React.useState(0);

    const selectedButtonStyle = {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        background: '#FFF',
    };

    const notSelectedButtonStyle = {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        background: '#287EDA',
    };

    const selectedIconStyle = {
        color: '#287EDA',
    };

    return (
        <div style={bottomNavStyle}>
            {[0, 1, 2, 3].map((index) => (
                <Button
                    key={index}
                    style={index === selectedButton ? selectedButtonStyle : notSelectedButtonStyle}
                    onClick={() => setSelectedButton(index)}
                >
                    <Icon24Home style={index === selectedButton ? selectedIconStyle : undefined} />
                </Button>
            ))}
        </div>
    );
};




const shadowBlockStyle = {
    width: '70px',
    height: '70px',
    flexShrink: 0,
    background: '#A4DDFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '50px',
    margin: 0
};

const IconStyle = {
    transform: 'scale(1.5)'
};

const ShadowBlock = ({ icon }:{icon:any}) => (
    <div style={shadowBlockStyle}>
        {React.cloneElement(icon, { style: IconStyle })}
    </div>
);




const buttonStyle = {
    margin: '5px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4DDFF',
    borderRadius: '10px'
};

const verticalCardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};
const icons = [
    <Icon28PlaneOutline />,
    <Icon28CompassOutline />,
    <Icon28Place />,
    <Icon28Attachments />,
    <Icon28Story />,
    <Icon28Clock />
];
const cardGridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
};


const imageStyleInCard = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
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
    margin: '10px 0'
};

interface IProps {
    id:string,
    go: React.Dispatch<React.SetStateAction<string>>
}
const Example:FC<IProps> = ({
                                id,
                                go
                            }) => {
    const imageUrls = [
        "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
        "https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg",
    ];

    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>

            <Group>
                <Gallery slideWidth="90%" bullets="dark">
                    <Slide imageUrl="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663155867_60-mykaleidoscope-ru-p-yezhik-veselii-krasivo-61.jpg" />
                    <Slide imageUrl="https://pichold.ru/wp-content/uploads/2018/10/s1200-2-2.jpg" />
                    <Slide imageUrl="https://uprostim.com/wp-content/uploads/2021/02/image004-49.jpg" />
                </Gallery>
            </Group>
            <Group mode="plain">
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
            <FixedLayout vertical="bottom">
                <BottomNavigation />
            </FixedLayout>

        </Panel>
    );
};

export default Example;