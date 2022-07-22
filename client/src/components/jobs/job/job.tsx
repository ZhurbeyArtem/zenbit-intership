import React, {useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {PageHeader, Layout, Button, Modal, Form, Input} from "antd";

import { useGetJobQuery} from "../homeStore";
import { useCreateBidMutation } from "components/bid/bidStore";
import {
    container,
    content,
    siteHeader,
    forTags,
    forTagsItem,
    info,
    infoBot,
    infoTop,
    infoRow,
    forDescription
} from "./styles";

import { validateMessages } from "./jobHooks";
import {notify} from "services/hooks/notificationHook";

const {Content} = Layout;
const Job = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const [bid] =  useCreateBidMutation()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const {data: job, isLoading} = useGetJobQuery(Number(id))
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const createBid = async (vales) => {
        setIsModalVisible(false);
        await bid({...vales, jobId:id})
        notify("Success")
        navigate('/')
    }

    return (
           isLoading ? <h1> Loading </h1>
               :<>
                   <div style={container}>
                       <PageHeader
                           style={siteHeader}
                           onBack={() => navigate('/')}
                           title={job.title}
                       />
                       <Content style={content}>
                           <div style={infoRow}>
                               <div style={info}>
                                   <div style={infoTop}>{job.hourlyRate}</div>
                                   <div style={infoBot}>Hour rate</div>
                               </div>
                               <div style={info}>
                                   <div style={infoTop}>{job.duration}</div>
                                   <div style={infoBot}>Time to finish task</div>
                               </div>
                               <div style={info}>
                                   <div style={infoTop}>{job.englishLevel}</div>
                                   <div style={infoBot}>English lvl</div>
                               </div>
                           </div>
                         <p style = {forDescription}>{job.description}</p>

                           <div>{job.tagsToJobs
                               &&
                               <ul style={forTags}>
                                   {job.tagsToJobs.map(e => <li key={e.tags.name} style={forTagsItem}>{e.tags.name}</li>)}
                               </ul>
                           }
                           </div>
                               <Button type="primary" onClick={showModal}>Make a bid</Button>
                       </Content>
                   </div>
                   <Modal title="Basic Modal" visible={isModalVisible}  onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true}}>
                       <Form name="nest-messages" onFinish={createBid} validateMessages={validateMessages}>
                           <Form.Item name={'description'} label="Description" rules={[{ required: true }]}>
                               <Input.TextArea />
                           </Form.Item>
                           <Form.Item name={'attachment'} label="Attachment" rules={[{ required: true }]}>
                               <Input />
                           </Form.Item>
                           <Form.Item name={ 'price'} label="Price" rules={[{ required: true }]}>
                               <Input />
                           </Form.Item>

                           <Form.Item >
                               <Button type="primary" htmlType="submit">
                                   Submit
                               </Button>
                           </Form.Item>
                       </Form>
                   </Modal>

               </>

    );
};

export default Job;