import React, { useState } from 'react';
import '../theme/lighttheme.css'
import { Button, Layout, Menu, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    PlusSquareOutlined,
    UnorderedListOutlined,
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const { Header, Sider, Content } = Layout;


export const PageLayout = (props) => {
    const { instance } = useMsal();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

    const handleLoginRedirect = () => {
        instance.loginPopup(loginRequest)
            .catch((error) => console.log(error));
    };

    const handleLogOutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    }

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={window.location.origin + '/logo512.png'} alt="logo" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PlusSquareOutlined />,
                            label: 'Create Idea',
                        },
                        {
                            key: '2',
                            icon: <UnorderedListOutlined />,
                            label: 'My Ideas',
                        },
                        {
                            key: '3',
                            icon: <UnorderedListOutlined />,
                            label: 'My Review',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className='header-content'
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <AuthenticatedTemplate>
                        <div className='header-login-content'>
                            <p>Hello, {activeAccount ? activeAccount.name : 'Unknown'}!</p>
                            <Button
                                type="text"
                                icon={<LogoutOutlined />}
                                onClick={handleLogOutRedirect}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64
                                }}
                            />
                        </div>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <div className='header-login-content'>
                            <Button
                                type="text"
                                icon={<LoginOutlined />}
                                onClick={handleLoginRedirect}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    float: 'right'
                                }}
                            />
                        </div>
                    </UnauthenticatedTemplate>

                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'Calc(100vh - 10em)',
                        background: colorBgContainer,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}
