import {createAsyncThunk } from "@reduxjs/toolkit"; 
import { ContactEditValues } from "../types/contactEditValues";
import { notification } from 'antd';
import axios from 'axios';

const openSuccessNotification= ():void  => {   
    notification.success({
        message: 'Your data has been successfully changed',
    })
};

const openErrorNotification= ():void  => {   
    notification.error({
        message: "Unable to update contact info",
    })
};

export const changeContactDetails = createAsyncThunk( 
    'posts/getPosts', 
    async (formData:ContactEditValues) => {
        console.log(formData)
        const config = {
            headers: { Authorization: `Bearer ${formData.token}` }
        };
    axios.patch(`${process.env.REACT_APP_BASE_URL}/settings/update-user-contacts`, formData, config )
        .then((response) =>{
            console.log(response);
            if (response) {
                openSuccessNotification()
            }
        })
        .catch(()=>openErrorNotification());
    })