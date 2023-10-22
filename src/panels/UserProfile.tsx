import React, {FC} from 'react';
import {Avatar, Button, Cell, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {
    Icon16WindRainSnow,
    Icon28CoinsOutline,
    Icon28PaymentCardOutline,
    Icon28PlaceOutline,
    Icon28TrainOutline,
    Icon28HeadphonesOutline
} from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import marImage from './../img/mar.png';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {useRouter} from "@happysanta/router";
import {PAGE_ACHIEVEMENTS, PAGE_AUDIO, PAGE_BESTTIMES, PAGE_CARDS, PAGE_HOME, PAGE_SHOP, PAGE_WHATWAS} from "../index";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";

interface IProps {
    id: string
}

const UserProfile: FC<IProps> = ({
                                     id,
                                 }) => {

    const user = useSelector((state: RootState) => state.user)

    const router = useRouter()

    return (
        <Panel id={id} style={{paddingBottom: BOTTOM_PADDING_GLOBAL, height: '100vh'}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => router.pushPage(PAGE_HOME)}/>}>Профиль</PanelHeader>
            <Group>
                <Div style={{alignItems: 'center', display: 'flex',}}>
                    <Avatar size={96} src={user.photo_200}/>
                    <Header mode="primary">{user.first_name} {user.last_name}</Header>
                </Div>
            </Group>

            <Group>
                {/*<Cell before={<Icon28PlaceOutline />} expandable>Мои путешествия</Cell>*/}
                <Cell
                    before={<Icon28PaymentCardOutline/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_CARDS)}
                >Привязанные карты</Cell>
                <Cell
                    before={<Icon16WindRainSnow width={28} height={28}/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_BESTTIMES)}
                >Лучшее время</Cell>
                <Cell
                    before={<Icon28HeadphonesOutline width={28} height={28}/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_AUDIO)}
                >Аудиогид</Cell>
                {/*<Cell before={<Icon28StatisticsOutline />} expandable>Аналитика</Cell>*/}
                {/*<Cell before={<Icon28UserStarOutline />} expandable>Избранное</Cell>*/}
                <Cell
                    before={<Icon28TrainOutline/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_ACHIEVEMENTS)}
                >Достижения</Cell>
                <Cell
                    before={<Icon28CoinsOutline/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_SHOP)}
                >Потратить баллы</Cell>
                <Cell
                    before={<Icon28PlaceOutline/>}
                    expandable
                    onClick={() => router.pushPage(PAGE_WHATWAS)}
                >Что было дальше?</Cell>
            </Group>

            <Div>
                <Button
                    size="l"
                    mode="primary"
                    style={{background: '#784DF4', color: 'white', fontSize: '15px'}}
                    stretched
                    before={<img src={marImage} style={{width: '17px', height: '22px'}} alt="Mar Icon"/>}
                >
                    Маруся
                </Button>
            </Div>
        </Panel>
    )

}

export default UserProfile;
