import React, {useEffect, useRef, useState} from 'react'
import {Menu, TDishObjsVal} from './menu'
import {useLazyQuery} from '@apollo/client';
import {GetLazyPromise, QUERY_MENU_LIST} from '../../apis';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import MenuForm, {MenuFormRef} from "./MenuForm";
import BmsSpinning from "../../components/BmsSpinning";
import NotAvailable from "../NotAvailable";
import {Button} from "antd";

/**
 * Menu 页面
 * 
 * @author by.
 * @date 2023/7/23
 */

export default function MenuList() {
    // const currentMenuData = useRef<Menu>()

    let menuArray:Menu[]=[]
    const menuModelRef = useRef<MenuFormRef>(null)
    const[menuData, setMenuData] = useState({
        page:1,
        pageSize:10,
        total:1,
        menu:menuArray
    });
    const [spin,setSpin] = useState<boolean>(true)
    const [getMenuList, { loading, error }] = useLazyQuery(QUERY_MENU_LIST)

    //定义表头
    const columns:ProColumns<Menu>[] = [
        {
            title:'菜单编号',
            width: 120,
            dataIndex: 'id',
        },
        {
            title:'菜单名',
            width:120,
            dataIndex:'name',

        },
        {
            title:'菜单类型',
            width:120,
            dataIndex:'typeInt'
        },
        {
            title:'登记时间',
            width:120,
            dataIndex:'time'
        },
        {
            title:'操作',
            key:'option',
            width:80,
            valueType:'option',
            render:(node, menu) => {
                return (
                    <Button type="link"
                            style={{color:"#13C2C2"}}
                            onClick={()=>{
                                menuModelRef.current?.showModel(menu)
                            }}
                    >查看详情</Button>
                )
            }
        }
    ]

    const expandedRowRender = (data:TDishObjsVal[], dishId:string) => {
        return (
          <ProTable
            columns={[
                { title:'菜编号', dataIndex:'dishId', key:dishId+'dishId'},
                { title:'菜品名', dataIndex:'dishName', key:dishId+'dishName'},
                // { hideInTable:true, title: '值编号', dataIndex: 'valId', key: 'valId'}
            ]}
            key={dishId+"dishes"}
            headerTitle={false}
            search={false}
            options={false}
            dataSource={data}
            pagination={false}
          />
        );
      };

    useEffect(() => {
        setSpin(true)
        GetLazyPromise({
            variables:{
                input:{
                    pageNo:menuData.page,
                    pageSize:menuData.pageSize
                }
            }
        }, getMenuList).then((data:any) => {
            setMenuData({
                ...menuData,
                menu:data.menuList.data,
                page:data.menuList.pageNo,
                total:data.menuList.totalPages,
            })
            setSpin(false)

        }).catch((error) => {
            console.log(error)
            return (
                <NotAvailable/>
            )
        })
    },[menuData.page,menuData.pageSize])


    return (
        <div>
            <div>
                <BmsSpinning
                 loading={spin}/>
            </div>
            <MenuForm ref={menuModelRef}></MenuForm>
            <ProTable<Menu>
                columns={columns}
                rowKey="id"
                dataSource={menuData.menu}
                headerTitle={false}
                search={false}
                pagination={{
                    showQuickJumper:true,
                    defaultCurrent:1,
                    defaultPageSize:10,
                    total:menuData.total,
                    onChange:(page,pageSize) => {
                        setMenuData({
                            ...menuData,
                            page,
                            pageSize
                        })
                    },
                    onShowSizeChange:(_, size) => {
                        setMenuData({
                            ...menuData,
                            pageSize: size
                        })
                    }
                }}
                expandable={{
                   expandedRowRender:(record) => {
                        return expandedRowRender(record.list, record.id)
                   },
                   rowExpandable:(record) => record.list!==undefined && record.list !== null
                }}

            />
        </div>
    )
}

