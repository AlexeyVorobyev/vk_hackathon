import {createSlice, Draft} from "@reduxjs/toolkit";
import {IRouteData} from "../../../mock/mockRoutesData";
export interface MapState {
  chosenRoute: IRouteData | null
}

const initialState = {
    chosenRoute = null
} as MapState

export const mapSlice = createSlice({
    name:'map',
    initialState:initialState,
    reducers: {
        setChosenRoute: ((state:Draft<MapState>,{payload}:{payload:IRouteData}) => {
            state.chosenRoute = payload
        }),
    }
})

export const {actions,reducer} = mapSlice