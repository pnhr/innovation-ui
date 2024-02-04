import React from 'react';
import { Avatar, List } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

export const Notifications = (props) => {
  const { items } = props;
  return (
    <>
      {items && items.length > 0 &&
        <List
          pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" icon={<NotificationOutlined style={{ color: '#FFFFFF' }} />} />
                }
                description={item.notification}
              />
            </List.Item>
          )}
        />}
    </>
  )
}
