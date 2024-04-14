import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIENDPOINT } from '../../utils/AppConstants';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export interface IGarage {
    "garageOwner"?: string;
    "address"?: string;
    "contactNumber"?: string;
    "ownerPhoneNumber"?: string;
    "garageName"?: string;
    "isPaid"?: boolean
    "isMessageEnabled"?: boolean
    "icon"?: string;
    createAt?: string;
    updatedAt?: string;
    id?: number;
}


export const garageApi = createApi({

    reducerPath: 'garageApi',
    baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINT }),
    endpoints: (builder) => ({
        getGarage: builder.query({
            query: (phoneNumber: string) => ({
                url: `garage/getGarageService/${phoneNumber}`,
                method: 'GET'
            }),
            transformResponse: (response: IGarage) => {
                return response;
            }
        }),
        updateGarage: builder.mutation({
            query: (body: IGarage) => ({
                url: `garage/updateGarageService/${body.id}`,
                method: 'PUT',
                body
            }),
            transformResponse: (response: IGarage) => {
                return response;
            }
        }),
    })

});

export const { useUpdateGarageMutation, useGetGarageQuery } = garageApi;