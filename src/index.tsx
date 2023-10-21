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

export const PANEL_HOME = 'panel_home';
export const PANEL_ACHIEVEMENTS = '/panel_achievements'
export const PANEL_MAP = '/panel_map'
export const PANEL_USERPROFILE = '/panel_userprofile'
export const VIEW_HOME = '/view_home';


const routes = {
  [PAGE_HOME]: new Page(PANEL_HOME,VIEW_HOME),
  [PAGE_ACHIEVEMENTS]: new Page(PANEL_ACHIEVEMENTS,VIEW_HOME),
  [PAGE_MAP]: new Page(PANEL_MAP,VIEW_HOME),
  [PAGE_USERPROFILE]: new Page(PANEL_USERPROFILE,VIEW_HOME)
}

const router = new Router(routes)


ReactDOM.render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <App />
      </RouterContext.Provider>
    </Provider>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
