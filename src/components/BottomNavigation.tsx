import React, {CSSProperties, FC, useState} from "react";
import {Icon24Home, Icon24User, Icon28CarOutline, Icon28Users} from "@vkontakte/icons";
import {Button, useAppearance} from "@vkontakte/vkui";
import {useRouter} from "@happysanta/router";

export const PAGE_HOME = '/';
export const PAGE_ACHIEVEMENTS = '/achievements'
export const PAGE_MAP = '/map'
export const PAGE_USERPROFILE = '/userprofile'

export const PANEL_HOME = 'panel_home';
export const PANEL_ACHIEVEMENTS = '/panel_achievements'
export const PANEL_MAP = '/panel_map'
export const PANEL_USERPROFILE = '/panel_userprofile'
export const VIEW_HOME = '/view_home';

const selectedButtonStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
};

const notSelectedButtonStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
};

const selectedIconStyle = {
    color: '#287EDA',
};

const icons = [<Icon24Home/>, <Icon28CarOutline/>, <Icon28Users/>, <Icon24User/>];
const iconLinks = [PAGE_HOME,PAGE_MAP,'',PAGE_USERPROFILE]

interface IProps {
    setActivePanel: React.Dispatch<React.SetStateAction<string>>
}

const BottomNavigation:FC<IProps> = ({
                                        setActivePanel
                                     }) => {
    const [selectedButton, setSelectedButton] = useState(0);
    const appearance = useAppearance();

    const bottomNavStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #e7e7e7',
        background: appearance === 'light' ? "#FFF" : "#000",
        padding: '8px 0',
    };

    const router = useRouter()

    return (
        <div style={bottomNavStyle}>
            {icons.map((IconElement, index) => (
                <Button
                    key={index}
                    style={index === selectedButton ? selectedButtonStyle : notSelectedButtonStyle}
                    onClick={() => {
                        setSelectedButton(index)
                        router.pushPage(iconLinks[index])
                    }}
                >
                    {React.cloneElement(IconElement, { style: index === selectedButton ? selectedIconStyle as CSSProperties : undefined })}
                </Button>
            ))}
        </div>
    );
};

export default BottomNavigation