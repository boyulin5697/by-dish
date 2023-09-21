import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GetLazyPromise, QUERY_TYPE_LIST } from '../../apis'
import { TypeDef } from './typeSelector'
import { ProFormSelect } from '@ant-design/pro-components'
import NotAvailable from '../../pages/NotAvailable'


/**
 * 菜品类型选择组件
 *
 * @author by.
 * @param props
 * @returns
 */


type TypeSelectorProps = {
    onChange?:Function,
    width?:number | "lg" | "sm" | "md" | "xl" | "xs" | undefined
}

export default function TypeSelector(props:TypeSelectorProps) {

  const [ queryTypeList ] = useLazyQuery(QUERY_TYPE_LIST)

  const [ typeList, setTypeList ] = useState<TypeDef[]>([])
  
  const { onChange, width } = props

  useEffect(() => {
    GetLazyPromise({}, queryTypeList).then((data:any) => {
        setTypeList(
            data.custTypeList
        )
    }).catch((error) => {
        console.error(error)
        return (
            <NotAvailable/>
        )
    })
},[])
  
  return (
    <ProFormSelect
        name="intType"
        label="菜品类型"
        hasFeedback
        options={typeList.map((t) => ({
            label:t.label,
            value:t.typeid
        }))}
        placeholder="请选择菜品类型"
        width={width??"lg"}
        rules={[{ required: true, message: '请选择菜品类型!' }]}
        onChange={(value) => {
            onChange!=undefined?onChange(value):undefined
        }}
    />
  )
}
