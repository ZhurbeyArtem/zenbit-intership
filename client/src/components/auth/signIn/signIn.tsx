import React from 'react';
import {useNavigate} from "react-router-dom";
import {GoogleOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Input} from 'antd';


import {useGoogleUserQuery, useLoginUserMutation} from "components/auth/authStore";
import {forForm, formItemLayout, tailFormItemLayout} from "./styles";
import {ISignIn} from "./model";
import {useAppDispatch} from "services/hooks/reduxHooks";
import {setUser} from "services/userSlice";
import {notify} from "services/hooks/notificationHook";




const SignIn = () => {
  const [signInUser] = useLoginUserMutation();
    const userGoogle =  useGoogleUserQuery();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

// for form
  const handleCreate = async (values: ISignIn) => {
    try {
      const user: object = await signInUser(values)
        // @ts-ignore
      if (user.error) notify(user.error.data)
      else {
          dispatch(setUser({
              token: user.data.token,
              firstName: user.data.firstName,
              lastName: user.data.lastName,
              phoneNumber: user.data.phoneNumber,
                  email: values.email,
                  userRole: user.data.userRole,
          }
          ))
        notify('Success')
        navigate('/')
      }
    } catch (e) {
      console.log(e + '');
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
            ]}
            hasFeedback
            labelAlign={"left"}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} shouldUpdate>
          {() => (
              <Button type="primary" htmlType="submit"
                      disabled={
                          !form.isFieldsTouched(true) ||
                          form.getFieldsError().filter(({ errors }) => errors.length)
                              .length > 0}
              >
                Sign IN
              </Button>
          )}
        </Form.Item>

        <Divider
        >OR</Divider>
                  <Button type="primary" ghost block onClick={googleLogin} ><GoogleOutlined/> Google</Button>
       </Form>
  )
};

export default SignIn
