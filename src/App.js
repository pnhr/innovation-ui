import './App.css';
import './theme/lighttheme.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { MyIdeas, Overview, ReviewIdeas } from './pages';
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'Calc(100vh - 10em)',
            background: colorBgContainer,
          }}
        >
          <MyIdeas />
          <Overview />
          <ReviewIdeas />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
