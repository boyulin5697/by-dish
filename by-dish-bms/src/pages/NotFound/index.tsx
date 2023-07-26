import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，页面未找到"
    extra={<Button type="primary"><Link to='/welcome'>回到首页</Link></Button>}
  />
);

export default NotFound;