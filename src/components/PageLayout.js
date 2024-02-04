import "../style/lighttheme.css"

import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, theme, Switch, Avatar, Badge, Space, Typography, Popover } from 'antd';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { USER_THEMES } from "../config";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined,
    PoweroffOutlined,
    BellOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { appRoutes, getRequiredRoutes } from "../utils"
import { Notifications } from "./Notifications"

const { Header, Sider, Content } = Layout;
const { Text } = Typography;


export const PageLayout = (props) => {
    const { IsDarkTheme, setIsDarkTheme } = props;
    const { instance } = useMsal();
    const [collapsed, setCollapsed] = useState(false);
    const [navMenu, setNavMenu] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userNotes, setUserNotes] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const { token: { colorBgContainer, logoBackground } } = theme.useToken();
    const isAuthenticated = useIsAuthenticated();

    const navigate = useNavigate();

    const getMenuitems = () => {
        console.log("getMenuitems called and isAuthenticated : ", isAuthenticated);
        let routes = getRequiredRoutes(appRoutes, isAuthenticated, true);
        let antdFormtObj = routes.map(item => {
            return {
                key: item.path,
                label: item.label,
                icon: item.icon
            }
        });
        setNavMenu(antdFormtObj);
    }

    const getUserNotifications = () => {
        setUserNotes([{ notification: "Sample Notificaiton one", isCompleted: false },
        { notification: "Sample Notificaiton Two", isCompleted: false }]);
        setNotificationCount(2)
    }

    const handleLogin = () => {
        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/redirect'
        }).catch((error) => console.log(error));
    }
    const handleLogOutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    }

    let activeAccount;
    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const showNotifications = (isOpen) => {
        if (notificationCount > 0)
            setIsOpen(isOpen);
    }
    const hideNotifications = () => {
        setIsOpen(false);
    }

    const getNotificationPopperHeander = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Your notifications</Text> <Text type="danger" onClick={hideNotifications} style={{ cursor:'pointer' }}>X</Text>
            </div>
        )
    }



    useEffect(() => {
        console.log("useEffect Called....")
        getMenuitems();
        if (isAuthenticated) {
            getUserNotifications();
        }
    }, [isAuthenticated, notificationCount])




    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                background: colorBgContainer,
            }}>
                <div className="logo" style={{ background: logoBackground }}>
                    <img src={window.location.origin + '/logo512.png'} alt="logo" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    style={{
                        background: colorBgContainer,
                    }}
                    items={navMenu}
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

                    <div className="header-login-content">
                        <Space>
                            <Switch size="small" checked={IsDarkTheme} checkedChildren={USER_THEMES.Dark}
                                unCheckedChildren={USER_THEMES.Light} onChange={(checked) => setIsDarkTheme(checked)} style={{ marginRight: '1em' }} />

                            <AuthenticatedTemplate>
                                <Space>
                                    <Popover
                                        content={<Notifications items={userNotes} />}
                                        title={getNotificationPopperHeander()}
                                        trigger="click"
                                        open={isOpen}
                                        onOpenChange={showNotifications}

                                    >
                                        <Badge count={notificationCount}>
                                            <Avatar shape="square" icon={<BellOutlined />} />
                                        </Badge>
                                    </Popover>

                                    <Text>Hello, {activeAccount ? activeAccount.name : 'Unknown'}!</Text>
                                    <Button
                                        type="text"
                                        icon={<PoweroffOutlined />}
                                        onClick={handleLogOutRedirect}
                                        style={{
                                            fontSize: '16px',
                                            width: 64,
                                            height: 64,
                                            color: 'red'
                                        }}
                                    />
                                </Space>
                            </AuthenticatedTemplate>
                            <UnauthenticatedTemplate>
                                <Button
                                    type="text"
                                    icon={<LoginOutlined />}
                                    onClick={handleLogin}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                        float: 'right'
                                    }}
                                />
                            </UnauthenticatedTemplate>
                        </Space>
                    </div>



                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'Calc(100vh - 10em)',
                        background: colorBgContainer,
                    }}
                >
                    {/* <AuthenticatedTemplate>
                        {props.children}
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <Card type="inner" title={<span style={{ color: 'red' }}>Please Login!</span>} style={{ width: '100%' }}>
                            <p>You have not logged in yet. Please <span onClick={handleLogin} style={{ color: 'blue', cursor: 'pointer' }}>login</span> to see your ideas.</p>
                        </Card>
                    </UnauthenticatedTemplate> */}
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}
