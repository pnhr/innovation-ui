import React from 'react'
import { Typography } from 'antd';
const { Title, Text } = Typography;

export const PageNotFound = () => {
  return (
      <div>
          <Title type='danger'>404:</Title><Title level={3}>Requested page does not exists!</Title>
      </div>
  )
}
