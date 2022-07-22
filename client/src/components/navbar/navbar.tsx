import React  from "react";
import {Link} from "react-router-dom";
import {Badge, Layout, Menu} from 'antd';
import Search from "antd/es/input/Search";
import { SettingOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";

import {forButton, forHeader, forMenu, forSearch, forSing, logo} from "./styleNavbar";
import { HOME_ROUTE, SIGNIN_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, BID_ROUTE } from "utils/consts";
import {useAppDispatch} from "services/hooks/reduxHooks";
import {removeUser} from "services/userSlice";
import { useGetBidsByStatusQuery } from '../bid/bidStore'

const {Header} = Layout;
const { SubMenu } = Menu;

export const Navbar = () => {
    const dispatch = useAppDispatch()
    const { isAuth } = useSelector((state:any) => state.user);

    const {data: bids} = useGetBidsByStatusQuery(undefined, {
        pollingInterval: 60000,
    })

    const onSearch = (value: string) => console.log(value); // in future will change
    return (
        <Layout>
            <Header style={forHeader} className="header">
                <div style={logo} className="logo"><Link to={HOME_ROUTE}>T2</Link></div>
                <Menu theme="dark" mode="horizontal" style={forMenu}>
                    <Menu.Item key="1">
                        <Search
                            style={forSearch}
                            placeholder={String(isAuth)}
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />
                    </Menu.Item>
                    {
                        isAuth ?
                            <>
                                <SubMenu key="sub1" title="MENU" style={forSing} icon={<SettingOutlined />}>
                                    <Menu.ItemGroup key="g1" >
                                        <Menu.Item key="settings">
                                            <Link to={SETTINGS_ROUTE}>Settings</Link>
                                        </Menu.Item>
                                        <Menu.Item key="bids">
                                        <Badge count={bids} offset={[15, 5]}>
                                            <Link to={BID_ROUTE} style={{color: 'white'}}>Bids on your job</Link>
                                        </Badge>
                                        </Menu.Item>
                                        <Menu.Item key="logout">
                                            <button style={forButton} onClick={()=> dispatch(removeUser())}>Logout</button>
                                        </Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>
                            </>
                        :
                            <><Menu.Item key="2" style={forSing}>
                                <Link to={SIGNIN_ROUTE}>LOG IN</Link></Menu.Item>
                                <Menu.Item key="3"><Link to={REGISTRATION_ROUTE}>SIGN UP</Link></Menu.Item>
                            </>

                    }
                </Menu>
            </Header>
        </Layout>
    );
}
