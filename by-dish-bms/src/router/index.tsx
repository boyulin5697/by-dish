import { ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import MenuList from "../pages/MenuList";
import NotFound from "../pages/NotFound";
import NotAvailable from "../pages/NotAvailable";
import DishList from "../pages/Dish/DishList";
import DishObject from "../pages/Dish/DishObjects";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import AddDishPage from "../pages/Dish/AddDishPage";

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
    return <Suspense fallback={<h1>Loading...</h1>}>
      {children}
    </Suspense>
  }

export const routers:RouteObject[] = [
    {
      path:'/',
      element:lazyLoad(<Welcome/>)
      //name:'欢迎使用'
    },
    {
        path:'/login',
        element: lazyLoad(<Login/>)
    },
    {
      path: 'menulist',
      element: lazyLoad(<MenuList/>)
    },
    {
      path:'dish',
      children:[
        {
          path: 'dishlist',
          element: lazyLoad(<DishList/>)
        },
        {
          path:'dishobject',
          element: lazyLoad(<DishObject/>)
        },
        {
            path:'adddish',
            element:lazyLoad(<AddDishPage/>)
        }
      ]
    },
    {
      path:'welcome',
      element: lazyLoad(<Welcome/>)
    },
    {
      path: '*',
      element:lazyLoad(<NotFound/>)
    },
    {
      path:'500',
      element:lazyLoad(<NotAvailable/>)
    }

]
