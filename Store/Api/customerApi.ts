import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APIENDPOINT, rupeeSym } from "../../utils/AppConstants";

export interface ICustomerInputParams {
    customerNumber?: string;
    serviceName?: string;
    serviceType?: string;
    car?: any;
    serviceDate?: string | Date;
    estimatedCost?: string;
    isCompleted?: boolean;
    productUsed?: any[];
    garageNumber?: string;
}

export interface ICustomerOutputParams {
    id: number;
    createdAt: string;
    customerNumber: string;
    serviceName: string;
    serviceType: string;
    serviceDate: string | Date;
    estimatedCost: string;
    isCompleted: boolean;
    productUsed: any[];
    garageNumber: string;
    updatedAt: string;
    products: iProductUsedInterface[]
}

interface iProductUsedInterface {
    "productName": string,
    "productPrice": number,
    "productMrp": number,
    "productDiscount": number
}


export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINT }),
    endpoints: (builder) => ({
        addCustomer: builder.mutation({
            query: (body: ICustomerInputParams) => {
                return ({
                url: `order/addCustomer`,
                method: 'POST',
                body,
            })},
            transformResponse: (response: ICustomerOutputParams) => {
                return response;
            },
        }),
        getCustomerList: builder.query({
            query: (garageNumber: string) => ({
                url: `order/customers/${garageNumber}`,
                method: 'GET'
            }),
            transformResponse: (response: ICustomerOutputParams[]) => {
                return response;
            },
        }),
        updateCustomer: builder.mutation({
            query: (body: ICustomerOutputParams) => ({
                url: `order/updateCustomer/${body.id}`,
                method: 'PUT',
                body,
            }),
            transformResponse: (response: ICustomerOutputParams) => {
                return response;
            },
        }),
        deleteCustomer: builder.mutation({
            query: (id: number) => ({
                url: `customer/deleteCustomer/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (response: ICustomerOutputParams) => {
                return response;
            },
        }),
    })
});

export const { useAddCustomerMutation, useGetCustomerListQuery,useUpdateCustomerMutation } = customerApi;