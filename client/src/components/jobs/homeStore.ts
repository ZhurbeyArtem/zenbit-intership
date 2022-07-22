import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {jobs, listResponse} from "./home/model";
import {RootState} from "../../services/store";
import {Itags} from "./job/model";


export const homeApi = createApi({

    reducerPath: 'homeApi',
    tagTypes: ['Jobs'],
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

            jobList: build.query<listResponse<jobs>, number>({
                query: (page: number = 1) => ({
                    url: `/jobs/getAll`,
                    params: {
                        page: page
                    },
                }),
                providesTags: result => ['Jobs']

            }),

            createJob: build.mutation<jobs, jobs>({
                query: (job) => ({
                    url: `/jobs`,
                    method: 'POST',
                    body: job,
                }),
                invalidatesTags: ['Jobs']
            }),

            getJob: build.query<jobs, number>({
                query: (id: number) => ({
                    url: `/jobs/${id}`,
                }),
            }),

            tagList: build.query<Itags[], void>({
                query: () => '/tags'
            }),

        })
    }
})

export const { useJobListQuery, useTagListQuery, useCreateJobMutation, useGetJobQuery } = homeApi

