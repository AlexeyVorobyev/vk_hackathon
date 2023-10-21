import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
} from "./types/auth";
import {GetLaunchParamsResponse} from "@vkontakte/vk-bridge";
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // authRefresh: builder.mutation<RefreshResponse,RefreshPayload>({
        //     query: (body) => ({
        //         url:`/api/auth/refresh`,
        //         method: 'POST',
        //         headers: {
        //             'Content-Type':'application/json'
        //         },
        //         body
        //     }),
        // }),
        authLogin: builder.mutation<LoginResponse,GetLaunchParamsResponse>({
            query: (body) => ({
                url:`/api/auth/vk/login`,
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
    useAuthLoginMutation,
} = authApi