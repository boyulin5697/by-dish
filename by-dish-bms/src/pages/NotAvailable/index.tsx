import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotAvailable: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Button type="primary">
      <Link to='/welcome'>回到首页</Link>
      </Button>}
  />
);

export default NotAvailable;