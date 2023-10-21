import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
} from "./types/auth";
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
        authLogin: builder.mutation<LoginResponse,LoginPayload>({
            query: (body) => ({
                url:`/api/auth/login`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useAuthLoginMutation,
} = authApi