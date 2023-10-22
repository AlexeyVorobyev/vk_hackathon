import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
} from "./types/auth";
import {GetLaunchParamsResponse} from "@vkontakte/vk-bridge";
import {IConstructRoutePayload} from "./types/map";
export const mapApi = api.injectEndpoints({
    endpoints: (builder) => ({
        constructRoute: builder.mutation<any,IConstructRoutePayload>({
            query: (body) => ({
                url:`https://maps.vk.com/api/directions?api_key=25d8d6a2246d7544607224e6b41fc8019a010d3ba73f85d03ed8ffda25b97205`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:body
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useConstructRouteMutation,
} = mapApi