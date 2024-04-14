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
    carKilometer?:number;
    serviceDate: string | Date;
    estimatedCost: string | number;
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

export type filterType = 'today' | 'month' | 'year' | 'overall' | 'progress' | 'completed';
interface iSaleReportInterface {
    type:filterType;
    garageNumber: string;
}

export interface iSalesReport {
    totalOrders:number;
    completedOrders:number;
    ordersList:ICustomerOutputParams[];
    pendingOrders:number;
    totalRevenue:number;
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
        saleReport: builder.mutation({
            query: (body: iSaleReportInterface) => ({
                url: `order/orderStats`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: iSalesReport) => {
                return response;
            },
        }),
    })
});

export const { useAddCustomerMutation, useGetCustomerListQuery,useUpdateCustomerMutation,useSaleReportMutation } = customerApi;