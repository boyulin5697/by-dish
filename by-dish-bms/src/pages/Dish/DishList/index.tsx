import React, {useEffect, useState} from 'react'
import {useLazyQuery, useQuery} from '@apollo/client';
import {GetLazyPromise, QUERY_DISH_LIST} from '../../../apis';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import NotAvailable from '../../NotAvailable';
import BmsSpinning from '../../../components/BmsSpinning';
import { Dish } from '../dish';
import {Space, Tag} from 'antd';
import './index.css'
import DishForm from "../DishForm";

/**
 * Dish列表主页面
 * 
 * @author by.
 * @date 2023/7/23
 */

export default function DishList() {
    const [spin,setSpin] = useState<boolean>(true)
    const[dishData, setDishData] = useState({
        page:1,
        pageSize:10,
        total:1,
        dish:[]
    });
    const [ getDishList ] = useLazyQuery(QUERY_DISH_LIST)

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
                        record.label != undefined && true&&record.label.length!=0?record.label.map((value) =>
                            <Tag color={"#13C2C2"} key={value}>
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
        },
        {
            title:'操作',
            key:'option',
            width:80,
            valueType:'option',
            render:(_,dish) => {
                return (
                    <DishForm
                        key={dish.id}
                        dish={dish}
                    />
                )
            }
        }
    ]


    useEffect(() => {
        GetLazyPromise({
            variables:{
                input:{
                    pageNo:dishData.page,
                    pageSize:dishData.pageSize
                }
            }
        }, getDishList).then((data:any) => {
            setDishData({
                ...dishData,
                dish:data.dishList.data,
                page:data.dishList.pageNo,
                total:data.dishList.totalPages,
            })
            setSpin(false)

        }).catch((error) => {
            console.error(error)
            return (
                <NotAvailable/>
            )
        })
    },[dishData.page,dishData.pageSize])


    return (
        <div>
            <div>
                <BmsSpinning
                    loading={spin}/>
            </div>
            <div>
            <ProTable<Dish>
                columns={columns}
                dataSource={dishData.dish}
                headerTitle={false}
                search={false}
                pagination={{
                    showQuickJumper:true,
                    defaultCurrent:1,
                    defaultPageSize:10,
                    total:dishData.total,
                    onChange:(page,pageSize) => {
                        setDishData({
                            ...dishData,
                            page,
                            pageSize
                        })
                    },
                    onShowSizeChange:(_, size) => {
                        setDishData({
                            ...dishData,
                            pageSize: size,
                            page:1
                        })
                    }
                }}
            />
            </div>
        </div>
    )
}

