import React, {FC} from 'react';
import {
	Panel, PanelHeader, Header, Group, Cell, Avatar, Div, Button
} from '@vkontakte/vkui';
import { Icon28PlaceOutline, Icon28WalletOutline, Icon28PaymentCardOutline, Icon28StatisticsOutline, Icon28UserStarOutline, Icon28BillheadOutline, Icon28HelpOutline, Icon28TrainOutline, Icon28CoinsOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import marImage from './../img/mar.png';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";

interface IProps {
	id:string
	setActivePanel:any
}

const UserProfile:FC<IProps> = ({
						 		id,
						 		setActivePanel
					 			}) => {

	const user = useSelector((state:RootState) => state.user)

	return (
		<Panel id={id}>
			<PanelHeader>Главная</PanelHeader>
			<Group>
				<Div style={{ alignItems: 'center' }}>
					<Avatar size={96} src={user.photo_200} />
					<Header mode="secondary">{user.first_name} {user.last_name}</Header>
				</Div>
			</Group>

			<Group>
				<Cell before={<Icon28PlaceOutline />} expandable>Мои путешествия</Cell>
				<Cell before={<Icon28WalletOutline />} expandable>Мои попутчики</Cell>
				<Cell before={<Icon28PaymentCardOutline />} expandable>Привязанные карты</Cell>
				<Cell before={<Icon28StatisticsOutline />} expandable>Аналитика</Cell>
				<Cell before={<Icon28UserStarOutline />} expandable>Избранное</Cell>
				<Cell before={<Icon28BillheadOutline />} expandable>Расчеты</Cell>
				<Cell before={<Icon28HelpOutline />} expandable>Тех. поддержка</Cell>
				<Cell before={<Icon28TrainOutline />} expandable>Достижения</Cell>
				<Cell before={<Icon28CoinsOutline />} expandable>Потратить баллы</Cell>
			</Group>

			<Div>
				<Button
					size="l"
					mode="primary"
					style={{ background:'#784DF4', color:'white', fontSize:'15px' }}
					stretched
					before={<img src={marImage} style={{ width: '17px', height: '22px' }} alt="Mar Icon" />}
				>
					Маруся
				</Button>
			</Div>
		</Panel>
	)

}

export default UserProfile;