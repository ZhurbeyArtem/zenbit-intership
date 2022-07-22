import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GoogleOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Checkbox,
    Button,
    Divider,
    Radio
} from 'antd';

import { confirmValue } from "./registrationHooks";
import {useGoogleUserQuery, useRegistrationUserMutation} from "components/auth/authStore";
import {formItemLayout, tailFormItemLayout, forForm, forRadio, forRadioButton} from "./styles";
import {IRegistration} from "./model";
import {useAppDispatch} from "services/hooks/reduxHooks";
import {setUser} from "services/userSlice";
import {notify} from "services/hooks/notificationHook";



const Registration = () => {
    const [registrationUser] = useRegistrationUserMutation();
    const userGoogle =  useGoogleUserQuery();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

// for form
    const handleCreate = async (values: IRegistration) => {
        try {
            const user: object = await registrationUser(values)
            // @ts-ignore
            console.log(user)
            if (user.data.status === 400) notify(user.data.message)
            else {

                dispatch(setUser({
                    token: user.data.token,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    email: values.email,
                    userRole: values.userRole,
                }))
                notify('Success')
                navigate('/')
            }
        } catch (e) {
            console.log('bad')
            console.log(e + '')
            alert(e)
        }
    }

    // for google button
    const googleLogin = async () =>{
        let timer: NodeJS.Timeout | null = null;
        const googleLoginURL = `${process.env.REACT_APP_BASE_URL}/google`
        const newWindow = await window.open(googleLoginURL, '_blank','width=500, height=600');

        if (newWindow){
            timer = setInterval( () =>{
                if(newWindow.closed){

                    dispatch(setUser({
                            token: '',
                            firstName: '',
                            lastName: '',
                            phoneNumber: ''
                        }
                    ))

                    if(timer) clearInterval(timer)
                }
            })
        }
    }

    return (

        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleCreate}
            scrollToFirstError
            style={forForm}
        >

            <Form.Item name="userRole"
                       label="Who are you?"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your name!',
                               whitespace: true,
                           },
                       ]}
                       labelAlign={"left"}
            >
                <Radio.Group style={forRadio} >
                    <Radio.Button value="Freelancer" style={forRadioButton}>Freelancer</Radio.Button>
                    <Radio.Button value="Employer" style={forRadioButton}>Employer</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="firstName"
                label="First Name"
                tooltip="What is your name?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        whitespace: true,
                    },
                ]}
                labelAlign={"left"}

            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Last Name"
                tooltip="What is your last name?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                        whitespace: true,
                    },
                ]}
                labelAlign={"left"}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                    {
                        len: 13,
                        message: 'Phone must be like +380502226582',
                    },
                ]}
                labelAlign={"left"}
            >
                <Input
                />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                labelAlign={"left"}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 8,
                        message: ' Minimum password length to at least a value of 8'
                    }
                ]}
                hasFeedback
                labelAlign={"left"}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    confirmValue
                ]}



                labelAlign={"left"}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} shouldUpdate>
                {() => (
                    <Button type="primary" htmlType="submit"
                            disabled={
                        !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length)
                                    .length > 0}
                    >
                        Register
                    </Button>
                )}
            </Form.Item>
            <Divider
            >OR</Divider>
            <Button type="primary" ghost block onClick={googleLogin} ><GoogleOutlined/> Google</Button>
        </Form>

    );

};

export default Registration