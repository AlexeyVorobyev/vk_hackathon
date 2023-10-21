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

const icons = [Icon24Home, Icon28CarOutline, Icon28Users, Icon24User];
const iconLinks = [PAGE_HOME,PAGE_MAP,PAGE_HOME,PAGE_USERPROFILE]


const BottomNavigation:FC = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const appearance = useAppearance();

    const bottomNavStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        background: appearance === 'light' ? "#BBE5FF" : "#444",
        padding: '20px 52px 20px 52px',
        borderRadius: '37px 37px 0 0'
    };

    const selectedButtonStyle = {
        borderRadius: '10px',
        width:'45px',
        height:'45px',
        background: appearance === 'light' ? "#FFF" : "#FFF",
    };

    const notSelectedButtonStyle = {
        width:'45px',
        height:'45px',
        flexShrink:0,
        boxSizing:'border-box',
        borderRadius: '10px',
    } as CSSProperties;

    const selectedIconStyle = {
        padding:'0',
        width:"20px",
        height:'20px',
        color: appearance === 'light' ? "#35A0E7" : "#000",
    };

    const iconStyle = {
        padding:'0',
        width:"20px",
        height:'20px'
    } as CSSProperties;

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
                    before={<IconElement style={index === selectedButton ? selectedIconStyle as CSSProperties : undefined }/>}
                >
                </Button>
            ))}
        </div>
    );
};

export default BottomNavigation