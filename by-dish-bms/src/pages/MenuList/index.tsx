import React, { useState } from 'react'
import { Menu, TDishObjsVal } from './menu'
import { useQuery } from '@apollo/client';
import { QUERY_MENU_LIST } from '../../apis';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import NotAvailable from '../NotAvailable';
import BmsSpinning from '../../components/BmsSpinning';
import {Button, Modal} from "antd";
import MenuForm from "./MenuForm";

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
    const[menuData, setMenuData] = useState<Menu[]>([]);
    const expandedRowRender = (data:TDishObjsVal[]) => {
        return (
          <ProTable
            columns={[
                { title:'菜编号', dataIndex:'dishId', key:'dishId'},
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
      

    const { loading, error, data, refetch} = useQuery(QUERY_MENU_LIST,
        {
            variables:{
                input:{
                    pageNo:1,
                    pageSize:10      
                }  
            },
            onCompleted:(data) => {
                setMenuData(data.menuList)
            }
        })
        if(loading){
            return <BmsSpinning/>
        }
        if (error){
            return (
              <NotAvailable/>
            )
        }

    return (
        <div>
            <ProTable<Menu>
                columns={columns}
                dataSource={menuData}
                headerTitle={false}
                search={false}
                pagination={false}
                expandable={{
                   expandedRowRender:(record) => {
                        return expandedRowRender(record.list)
                   },
                   rowExpandable:(record) => record.list!==undefined && record.list !== null
                }}

            />
        </div>
    )
}

