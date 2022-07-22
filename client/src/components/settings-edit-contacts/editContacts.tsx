import React from "react";
import 'antd/dist/antd.css';
import { useSelector} from "react-redux";
import { changeContactDetails } from "services/editUserContacts";
import { ContactEditValues } from "types/contactEditValues";
import {
    Form,
    Input,
    Button
} from 'antd';

import {formItemLayout, tailFormItemLayout, forForm} from "./styles";
import {useAppDispatch} from "services/hooks/reduxHooks";



function EditContacts() {
    const dispatch = useAppDispatch()
  const [form] = Form.useForm();
  const {firstName, 
        lastName,
        email,
        phoneNumber,
        token} = useSelector((state:any) => state.user.user);
  const dispatchInputValues = (values:ContactEditValues) => {
      try {
          const updateUser = {...values, email: email, token: token}
          dispatch(
              changeContactDetails(updateUser)
          )
      }catch (e){
          alert(e)
      }

  }
  return (
      <section>
        <h1>Edit contact info</h1>
        <Form 
            {...formItemLayout}
            form={form}
            name="edit-user-contacts"
            onFinish={(values:ContactEditValues) => dispatchInputValues(values)}
            style={forForm}
            scrollToFirstError
            fields={[
              {
                name: ["firstName"],
                value:firstName,
              },
              {
                name: ["lastName"],
                value:lastName,
              },
              {
                name: ["phoneNumber"],
                value:phoneNumber,
              },
            ]}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
                {
                    required: true,
                    message: 'Please input your first name!',
                    whitespace: true,
                },
            ]}>
            <Input type="firstName"/>
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
                {
                    required: true,
                    message: 'Please input your last name!',
                    whitespace: true,
                },
            ]}>
            <Input type="lastName"/>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                    whitespace: true,
                },
            ]}>
            <Input type="phone"/>
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout} shouldUpdate>
            <Button
              type="primary" htmlType="submit"
              disabled={
                  !form.isFieldsTouched(true) || 
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length 
              }>
                Save
              </Button>
          </Form.Item>
        </Form>
      </section>
  )
}

export default EditContacts;
