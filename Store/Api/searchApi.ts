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

export interface productSearchApiInterface {
 "id": number,
  "productName": string,
  "car": string,
  "gst": number,
  "scannedValue"?:  string,
  "qty"?: number,
  "expiryDate"?: string,
  "purchasePrice"?: number,
  "mrp"?: number,
  "sellingPrice"?: number,
  "flatDiscount"?: number,
  "percentageDiscount": "0",
  "garageContactNumber"?: string,
  "createdAt"?: string,
  "updatedAt"?: string,
  "createdBy"?: string
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
query: () => ({ 
 url: `product/products?garageContactNumber=9839284651`, method: 'GET' }),
transformResponse: (response: productSearchApiInterface[]) => {
 return response.map((product) => ({
  id: product.id,
  label: `${product?.productName} `,
  value: product.id.toLocaleString(),
  image: '',
  subLabel: `${rupeeSym} ${product?.sellingPrice} | Q- ${product?.qty} | car - ${product?.car}`,
 }));
},
  })
 })
});

export const { useGetSearchCarQuery,useGetProductListQuery } = carSearchApi;
