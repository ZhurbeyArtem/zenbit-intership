import { Menu, Layout } from 'antd';
import React from 'react';
import EditContactsPage from "../settings-edit-contacts/editContacts";

const { Content, Sider } = Layout;

function Settings() {
  return (<section>
              <Layout>
                <Sider style={{backgroundColor:"none"}}>
                    <Menu
                      defaultSelectedKeys={['1']}
                      mode="inline">
                        <Menu.ItemGroup key="g1" title="Settings">
                            <Menu.Item key="1">Contact settings</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu>
                  </Sider>
                <Layout>
                  <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                      <EditContactsPage />
                  </Content>
                </Layout>
            </Layout>
        </section>);
}

export default Settings;
