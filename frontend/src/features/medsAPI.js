import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medsAPI = createApi({
    reducerPath: "medsAPI", //service of the API
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:10000",
    }),
    endpoints: (builder) => ({
        getAllMeds: builder.query({
            query: (id) => "meds"
        })
    })
});

export const { useGetAllMedsQuery } = medsAPI;