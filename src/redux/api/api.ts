import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getTokens} from "../../utils/getAuthToken";
import {RefreshPayload, RefreshResponse} from "./types/auth";

const disabledAuthTokenEndpoints = [
    'authSignUp','authRefresh','authLogin'
]
export const api = createApi({
    reducerPath:'api',
    tagTypes:['tag1','tag2'],
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers,api) => {
            if (!disabledAuthTokenEndpoints.includes(api.endpoint)) {
                if (Number(localStorage.getItem('accessToken')) < new Date().getTime()) {
                    const [authRefresh] = useAuthRefreshMutation()
                    authRefresh({refreshToken:localStorage.getItem('refreshToken')!})
                        .then((response) => {
                            if (response.hasOwnProperty('data')) {
                                // @ts-ignore
                                localStorage.setItem('accessToken',response.data.response.accessToken)
                                // @ts-ignore
                                localStorage.setItem('refreshToken',response.data.response.refreshToken)
                                // @ts-ignore
                                localStorage.setItem('expiry',response.data.response.expiry)
                                headers.set('Authorization',`Bearer ${getTokens().accessToken}`)
                            }
                        })
                }
                else {
                    headers.set('Authorization',`Bearer ${getTokens().accessToken}`)
                    return headers
                }
            }
            else return headers
        }
    }),
    endpoints: (builder) => ({
        authRefresh: builder.mutation<RefreshResponse,RefreshPayload>({
            query: (body) => ({
                url:`/api/auth/refresh`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
    })
})

const {useAuthRefreshMutation} = api
