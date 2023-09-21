import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
  } from '@ant-design/icons';


  export default {
    route: {
      path: '',
      routes: [
        {
          path: '/welcome',
          name: '欢迎',
          element: '../Welcome',
          icon: <SmileFilled />
        },
        {
          name: '菜品管理',
          icon: <CrownFilled />,
          path:'/dish',
          routes: [
            {
              path: '/dish/dishlist',
              name: '菜品列表',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
              element: '../Dish/DishList'
            },
            {
              path: '/dish/dishobject',
              name: '菜品相关对象',
              icon: <CrownFilled />,
              element: '../Dish/DishObject'
            },
            {
              path:'/dish/adddish',
              name:'添加菜品',
              icon: <CrownFilled/>,
              element:'../Dish/AddDishPage'
            }
          ],
        },
        {
          path: '/menulist',
          name: '菜单管理',
          icon: <ChromeFilled />,
          element:'../MenuList'
        }
      ],
    },
    location: {
      pathname: '/welcome',
    },
  };

