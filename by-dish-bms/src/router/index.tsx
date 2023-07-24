import { ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import MenuList from "../pages/MenuList";
import App from "../App";
import { Menu } from "antd";
import AppLayout from "../pages/AppLayout";

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
    return <Suspense fallback={<h1>Loading...</h1>}>
      {children}
    </Suspense>
  }

export const routers:RouteObject[] = [
    {
        path: '/',
        element: <AppLayout/>
    },
    {
        path: '/menulist',
        element: <MenuList/>
    }
]
