import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIENDPOINT } from '../../utils/AppConstants';

export interface UserAutApiResponseType {
    id?: number;
    userName?: string;
    phone?: string;
    profilePic?: string;
    type?: string;
    userCode?: string;
    createdAt?: string;
    updatedAt?: string;
}
export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINT }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'user/validateUser',
                method: 'POST',
                body,
            }),
            transformResponse: (response: UserAutApiResponseType) => {
                return response;
            },
        }),
        register: builder.query({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // Modify the response here
                return response;
            },
            
        // }),
        // verifyOtp: builder.mutation({
        //     query: (body) => ({
        //         url: '/verifyOtp',
        //         method: 'POST',
        //         body,
        //     }),
        //     transformResponse: (response) => {
        //         // Modify the response here
        //         return response;
        //     },
        }),
    }),
});

export const { useLoginMutation,useRegisterQuery } = userAuthApi;