import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import { bid } from "./model";
import {RootState} from "services/store";

export const bidApi = createApi({

    reducerPath: 'bidApi',
    tagTypes: ['Bids'],
    baseQuery: fetchBaseQuery({
        baseUrl: String(process.env.REACT_APP_BASE_URL),
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).user.user.token

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (build) => {
        return ({

            createBid: build.mutation<bid, bid>({  // 1 те що вертаєм 2 те що передаєм
                query: (bid) => ({
                    url: `/bid`,
                    method: 'POST',
                    body: bid,
                }),
            }),

            getBidsByStatus: build.query<number, void>({
                query: () => '/bid/byStatus'
            }),

            getBids: build.query<bid[], void>({
                query: () => '/bid',
                providesTags: result => ['Bids'],
            }),

            deleteBid: build.mutation<string, number>({  // 1 те що вертаєм 2 те що передаєм
                query: (id:number) => ({
                    url: `/bid/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: result => ['Bids']
            }),

        })
    }
})

export const { useCreateBidMutation, useGetBidsQuery, useGetBidsByStatusQuery, useDeleteBidMutation } = bidApi

