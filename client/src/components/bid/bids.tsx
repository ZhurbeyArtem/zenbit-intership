import React, {useState} from 'react';
import {Button, Table} from 'antd';
import {columns} from "./bidHooks";
import {useDeleteBidMutation, useGetBidsQuery} from "./bidStore";
import {wrapper} from "./styles";
import {Link} from "react-router-dom";
import {notify} from "services/hooks/notificationHook";


const Bids = () => {
    const {data: bid,} = useGetBidsQuery(undefined, {refetchOnMountOrArgChange: true})
    const [delBid] = useDeleteBidMutation()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onDelete = async (id) => {
        const result = await delBid(id)
        if (result.data) notify(result.data.message)
        else notify("Success")
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const actions = {
        key: '1',
        title: "Actions",
        render: (record) => {
            return <>
                <Button type="primary" ghost onClick={() => {
                    onDelete(record.Bid_id)
                }
                }
                >Apply</Button>
                <Button type="primary" ghost danger style={{marginLeft: 10}} onClick={() => {
                    onDelete(record.Bid_id)
                }
                }>Delete</Button>
            </>
        }
    }

    return (
        <div
            style={wrapper}
        >
            <Table
                columns={[...columns, actions]}
                expandable={{
                    expandedRowRender: record => <p style={{margin: 0}}>{record.Bid_description}</p>,
                    rowExpandable: record => record.Bid_description !== 'Not Expandable',
                }}
                dataSource={
                    bid?.map(e => {
                   return {...e, key: e.Bid_id, link: (<Link to={`/job/${e.Bid_jobId}`}>link</Link>)}
                })
            }
                style={{width: '100%'}}
                rowSelection={rowSelection}
            />
        </div>
    );
};

export default Bids;





