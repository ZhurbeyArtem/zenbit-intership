import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IRegistration} from "./registration/model";
import {ISignIn} from "./signIn/model";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: String(process.env.REACT_APP_BASE_URL) , credentials: "include"}),
    tagTypes: ["auth"],
    endpoints: (build) => ({
        registrationUser: build.mutation<IRegistration, IRegistration>({
            query: ({firstName, lastName, email, userRole, password, phoneNumber}) => {
                return{
                    url: '/auth/registration',
                    method: 'POST',
                    body: {
                        firstName,
                        lastName,
                        email,
                        userRole,
                        password,
                        phoneNumber
                    },
                }
            },
            invalidatesTags: [{type: "auth", id: "LIST"}]
        }),
        loginUser: build.mutation<ISignIn, ISignIn>({
            query: ({ email, password }) => {
                return {
                    url: '/auth/signin',
                    method: 'POST',
                    body: {
                        email,
                        password
                    },
                }
            },
            invalidatesTags: [{type: "auth", id: "LIST"}]
        }),
        googleUser: build.query<object, object>({
            query: () => ({
                url: '/google'
            }),
        })

    })
});

export const {useRegistrationUserMutation, useLoginUserMutation, useGoogleUserQuery} = authApi

