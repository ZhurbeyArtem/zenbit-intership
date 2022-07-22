import React from 'react';
import {Button, Form, Input, InputNumber, Select} from "antd";
import {useNavigate} from "react-router-dom";

import {forForm, layout} from "./styles";
import {useCreateJobMutation, useTagListQuery} from "../homeStore";
import {form, futureJob} from "./model";
import {notify} from "services/hooks/notificationHook";
import {getNameTags} from "./jobHooks";


const { Option } = Select;

const CreateJob = () => {
    const {data: tags} = useTagListQuery()
    const [job] =  useCreateJobMutation()

    const navigate = useNavigate();

     const onFinish = async (values: form<futureJob>) => {
     try {
         if( !values.suffix ) values.suffix = '$'
         values.job.hourlyRate = values.job.hourlyRate + ' ' + values.suffix

         const result =  await job( values.job )
         if( result.data.status === 400 ) notify( result.data.message )
         else {
             notify("Success")
             navigate('/')
         }
     }catch (e){
         console.log(e)
         alert(e)
     }
    };

    const suffixSelector = (
        <Form.Item name="suffix" noStyle >
            <Select style={{ width: 70 }} defaultValue='$'>
                <Option value="$">$</Option>
                <Option value="€">€</Option>
            </Select>
        </Form.Item>
    );


    return (
        <>
        <Form {...layout} name="nest-messages" onFinish={onFinish}  style={forForm}>
            <Form.Item name={['job', 'title']} label="Title" rules={[{ required: true ,  message: 'Please input your title!' }]}   labelAlign={"left"} >
                <Input />
            </Form.Item>
            <Form.Item name={['job', 'description']} label="Description" rules={[{
                required: true,
                message: 'Please input your description at least 50 characters!',
                whitespace: true,
                min: 50,

            }]}    labelAlign={"left"}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['job', 'hourlyRate']} label="Hourly rate"
                       rules={[{
                           type: 'number',
                           min: 0,
                           message:'Write how many money u pay per hour of work',
                           required: true
                       }]}    labelAlign={"left"}  >
                <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['job', 'duration']} label="Duration"    labelAlign={"left"}   rules={[{
                type: 'string',
                required: true,
                message: 'Please how many time have user that finish work!',
            }]}   >
             <Input placeholder="for example 2 days"/>
            </Form.Item>
            <Form.Item name={['job', 'englishLevel']} label="English level"
                       rules={[{
                type: 'string',
                required: true,
                message: 'Please select english level!',
            }]}    labelAlign={"left"}>
                <Select>
                    <Option value="Elementary">Elementary</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                </Select>
            </Form.Item>
                <Form.Item name={['job', 'tags']} label="Tags"
                        rules={[{
                            type: 'array',
                            required: true,
                            message: 'Please select at least 1 tag!',
                        }]} labelAlign={"left"}>
                <Select
                    mode="tags"
                    placeholder="Please select"
                    style={{width: '100%'}}
                >
                    {getNameTags(tags)}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>

    );
}

export default CreateJob;