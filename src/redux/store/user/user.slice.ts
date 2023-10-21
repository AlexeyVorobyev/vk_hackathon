import {createSlice, Draft} from "@reduxjs/toolkit";
export interface UserState {
    is_auth:boolean,
    id:number,
    bdate:string,
    bdate_visibility:number,
    city: {
        id:number,
        title:string
    }
    country:{
        id:number,
        title:string
    }
    photo_200:string,
    photo_max_orig:string,
    sex: 0 | 1 | 2,
    photo_100:string,
    first_name:string,
    last_name:string,
    can_access_closed:boolean,
    is_closed:boolean
}

export const userSlice = createSlice({
    name:'user',
    initialState:{is_auth:false} as UserState,
    reducers: {
        setLogin: (state:Draft<UserState>,{payload}:{payload:boolean}) => {
            state.is_auth = payload
        },
        setUserData: (state:Draft<UserState>,{payload}:{payload:UserState}) => {
            Object.keys(payload).map((value ) => {
                const key = value as keyof UserState
                // @ts-ignore
                state[key] = payload[key]
            })
        }
    }
})

export const {actions,reducer} = userSlice