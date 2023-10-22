import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./redux/store/store";
import {Provider} from "react-redux";
import {Page, Route, Router, RouterContext} from "@happysanta/router";

export const PAGE_HOME = '/';
export const PAGE_ACHIEVEMENTS = '/achievements'
export const PAGE_MAP = '/map'
export const PAGE_USERPROFILE = '/userprofile'
export const PAGE_SHOP = '/shop'
export const PAGE_CARDS = '/cards'
export const PAGE_ROUTES = '/routes'
export const PAGE_WHATWAS = '/whatwas'
export const PAGE_BESTTIMES = '/besttimes'
export const PAGE_AUDIO = '/audio'


export const PANEL_HOME = 'panel_home';
export const PANEL_ACHIEVEMENTS = '/panel_achievements'
export const PANEL_MAP = '/panel_map'
export const PANEL_USERPROFILE = '/panel_userprofile'
export const PANEL_SHOP = '/panel_shop'
export const PANEL_CARDS = '/panel_cards'
export const PANEL_ROUTES = '/panel_routes'
export const PANEL_WHATWAS = '/panel_whatwas'
export const PANEL_BESTTIMES = '/panel_besttimes'
export const PANEL_AUDIO = '/panel_audio'

export const VIEW_HOME = '/view_home';


const routes = {
    [PAGE_HOME]: new Page(PANEL_HOME, VIEW_HOME),
    [PAGE_ACHIEVEMENTS]: new Page(PANEL_ACHIEVEMENTS, VIEW_HOME),
    [PAGE_MAP]: new Page(PANEL_MAP, VIEW_HOME),
    [PAGE_USERPROFILE]: new Page(PANEL_USERPROFILE, VIEW_HOME),
    [PAGE_SHOP]: new Page(PANEL_SHOP, VIEW_HOME),
    [PAGE_CARDS]: new Page(PANEL_CARDS, VIEW_HOME),
    [PAGE_ROUTES]: new Page(PANEL_ROUTES, VIEW_HOME),
    [PAGE_WHATWAS]: new Page(PANEL_WHATWAS,VIEW_HOME),
    [PAGE_BESTTIMES]: new Page(PANEL_BESTTIMES,VIEW_HOME),
    [PAGE_AUDIO]: new Page(PANEL_AUDIO,VIEW_HOME)
}

const router = new Router(routes)


ReactDOM.render(
    <Provider store={store}>
        <RouterContext.Provider value={router}>
            <App/>
        </RouterContext.Provider>
    </Provider>, document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({default: eruda}) => {
    }); //runtime download
}
