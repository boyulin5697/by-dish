import React, {useEffect, useState} from 'react'
import {Menu, TDishObjsVal} from './menu'
import {LazyQueryHookOptions, useLazyQuery} from '@apollo/client';
import {GetLazyPromise, QUERY_MENU_LIST} from '../../apis';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Modal} from "antd";
import MenuForm from "./MenuForm";
import BmsSpinning from "../../components/BmsSpinning";
import NotAvailable from "../NotAvailable";

/**
 * Menu 页面
 * 
 * @author by.
 * @date 2023/7/23
 */

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
        render:(_,menu) => {
            const openDetail = () => {
              return (
                <Modal
                    open={true}
                    closable={true}
                >
                  <MenuForm
                      id={menu.id}
                      time={menu.time}
                      name={menu.name}
                      list={menu.list}
                      typeInt={menu.typeInt}
                  />
                </Modal>
              )
            }
            return (
                <Button type="link" onClick={openDetail}>查看详情</Button>
            )  
        }
    }
]

export default function MenuList() {
    const[menuData, setMenuData] = useState({
        page:1,
        pageSize:10,
        total:1,
        menu:[]
    });
    const [spin,setSpin] = useState<boolean>(true)
    const [getMenuList, { loading, error }] = useLazyQuery(QUERY_MENU_LIST)

    const expandedRowRender = (data:TDishObjsVal[]) => {
        return (
          <ProTable
            columns={[
                { title:'菜编号', dataIndex:'dishId', key:'dishId'},
                { title:'菜品名', dataIndex:'dishName', key:'dishName'},
                // { title: '对象编号', dataIndex: 'objId', key: 'objId' },
                // { title: '对象名', dataIndex: 'objName', key: 'objName' },
                // { title: '值标签', dataIndex: 'upgradeNum', key: 'upgradeNum' },
                // { hideInTable:true, title: '值编号', dataIndex: 'valId', key: 'valId'}
            ]}
            headerTitle={false}
            search={false}
            options={false}
            dataSource={data}
            pagination={false}
          />
        );
      };

    useEffect(() => {
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
                total:data.menuList.totalPages*data.menuList.pageSize,
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
            <div>
            <ProTable<Menu>
                columns={columns}
                dataSource={menuData.menu}
                headerTitle={false}
                search={false}
                pagination={{
                    showQuickJumper:true,
                    defaultCurrent:1,
                    defaultPageSize:10,
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
                        return expandedRowRender(record.list)
                   },
                   rowExpandable:(record) => record.list!==undefined && record.list !== null
                }}

            />
            </div>
        </div>
    )
}

