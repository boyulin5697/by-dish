import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import {  QUERY_DISH_LIST } from '../../../apis';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import NotAvailable from '../../NotAvailable';
import BmsSpinning from '../../../components/BmsSpinning';
import { Dish } from '../dish';
import { Space, Tag } from 'antd';
import './index.css'

/**
 * Dish列表主页面
 * 
 * @author by.
 * @date 2023/7/23
 */

const columns:ProColumns<Dish>[] = [
    {
        hideInTable:true,
        title:'菜品编号',
        width: 120,
        dataIndex: 'id',
    },
    {
        title:'菜品名',
        width:70,
        dataIndex:'name',
    },
    {
        title:'标签',
        width:120,
        dataIndex:'label',
        render:(_,record) => (
          <Space>
            {
              record.label!=undefined?record.label.map((value) => 
                <Tag color={"lime"} key={value}>
                  {value}
                </Tag>
              ):undefined
            }
          </Space>
        )
    },
    {
        title:'菜品图片',
        width:100,
        dataIndex:'pic',
        render:(_,record) => (
          record.pic != undefined?
          <Space>
            <img className="dish-img" src= {record.pic}></img>
          </Space>:undefined
        )
    },
    {
        title:'点单次数',
        width:70,
        dataIndex:'freq'
    },
    // {
    //     title:'菜品描述',
    //     width:120,
    //     dataIndex:'description'
    // },
    {
        hideInTable:true,
        title:'是否可用',
        width:10,
        dataIndex:'avb'
    }
]

export default function DishList() {
    const[dishData, setDishData] = useState<Dish[]>([]);
    const { loading, error, data, refetch} = useQuery(QUERY_DISH_LIST,
        {
            variables:{
                input:{
                    pageNo:1,
                    pageSize:10      
                }  
            },
            onCompleted:(data) => {
                setDishData(data.dishList)
                
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
            <ProTable<Dish>
                columns={columns}
                dataSource={dishData}
                headerTitle={false}
                search={false}
                pagination={false}
            />
        </div>
    )
}

