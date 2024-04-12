import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APIENDPOINT, rupeeSym } from "../../utils/AppConstants";

export interface singleProductInterface {
    "id": number;
    "productName": string;
    "qty": number;
    "expiryDate"?: string;
    "purchasePrice"?: number;
    "mrp"?: number;
    "gst"?: number;
    "car"?: number;
    "scannedValue"?: string;
    "sellingPrice"?: number;
    "flatDiscount"?: number;
    "percentageDiscount"?: string;
    "garageContactNumber"?: string;
    "createdAt"?: string;
    "updatedAt"?: string;
    "createdBy"?: string;
}

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINT }),
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (body: singleProductInterface) => ({
                url: `product/products`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: singleProductInterface) => {
                return response;
            },
        }),
        updateProduct: builder.mutation({
            query: (body: singleProductInterface) => ({
                url: `product/products/${body.id}`,
                method: 'PUT',
                body,
            }),
            transformResponse: (response: singleProductInterface) => {
                return response;
            },
        }),
        getProductList: builder.query({
            query: (phoneNumber: string) => ({
                url: `product/products?garageContactNumber=${phoneNumber}`, method: 'GET'
            }),
            transformResponse: (response: singleProductInterface[]) => {
                return response.map((product) => {
                    return {
                        id: product.id,
                        label: product.productName,
                        image:'',
                        subLabel: `${product.sellingPrice} | ${product.car}`,
                        
                    }
                });
            },
        }),
        deleteProduct: builder.mutation({
            query: (id: number) => ({
                url: `product/products/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: singleProductInterface) => {
                return response;
            },
        })
    })
});



export const { useAddProductMutation,useUpdateProductMutation, useGetProductListQuery,useDeleteProductMutation } = productApi;