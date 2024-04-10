import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APIENDPOINT, rupeeSym } from "../../utils/AppConstants";


export interface carSearchApiInterface {
    "id": number;
    "brand": string;
    "model": string;
    "imageUri": string;
    "year": string;
    "fuel_type": string;
    "createdAt": string;
    "updatedAt": string;
    "addedBy": string;

}


export const carSearchApi = createApi({
    reducerPath: "cxwarSearchApi",
    baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINT }),
    endpoints: (builder) => ({
        getSearchCar: builder.query({
            query: () => ({ 
                url: `car/cars`, method: 'GET' }),
            transformResponse: (response: carSearchApiInterface[]) => {
                return response.map((car) => ({
                    id: car.id,
                    label: `${car.model} ${car.brand}`,
                    value: car.id.toLocaleString(),
                    image: car.imageUri,
                    year: car.year,
                    subLabel: car.fuel_type,
                    createdAt: car.createdAt,
                    updatedAt: car.updatedAt,
                    addedBy: car.addedBy
                }));
            },
        }),
        getProductList: builder.query({
            query: (phoneNumber:string) => ({ 
            url: `product/products?garageContactNumber=${phoneNumber}`, method: 'GET' }),
            transformResponse: (response: any[]) => {
                return response.map((car) => ({
                    id: car.id,
                    label: car.productName,
                    value: car.id.toLocaleString(),
                    subLabel: `${rupeeSym} ${car.sellingPrice - car.flatDiscount}`,
                    createdAt: car.createdAt,
                    updatedAt: car.updatedAt,
                    addedBy: car.addedBy
                }));
            },
        })
    })
});

export const { useGetSearchCarQuery,useGetProductListQuery } = carSearchApi;
