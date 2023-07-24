import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
    TabletFilled,
  } from '@ant-design/icons';
import MenuList from '../MenuList';
import { Link, Route, useNavigate } from 'react-router-dom';

  
  export default {
    route: {
      path: '/',
      routes: [
        {
          path: '/welcome',
          name: '欢迎',
          icon: <SmileFilled />,
          component: './Welcome',
        },
        {
          path: '/dishadmin',
          name: '菜品管理',
          icon: <CrownFilled />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/admin/sub-page1',
              name: '一级页面',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
              component: './Welcome'
            },
            {
              path: '/admin/sub-page2',
              name: '二级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: '三级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          path: '/',
          name: '菜单管理',
          icon: <CrownFilled />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/menulist',
              name: '菜单列表',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            },
            {
              path: '/admin/sub-page2',
              name: '二级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: '三级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          name: '列表页',
          icon: <TabletFilled />,
          path: '/list',
          component: './ListTableList',
          routes: [
            {
              path: '/list/sub-page',
              name: '列表页面',
              icon: <CrownFilled />,
              routes: [
                {
                  path: 'sub-sub-page1',
                  name: '一一级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page2',
                  name: '一二级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page3',
                  name: '一三级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/list/sub-page2',
              name: '二级列表页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/list/sub-page3',
              name: '三级列表页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
      ],
    },
    location: {
      pathname: '/',
    },
  };

