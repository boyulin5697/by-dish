import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetLazyPromise, QUERY_OBJ_LIST } from '../../apis'
import NotAvailable from '../../pages/NotAvailable'
import { useLazyQuery } from '@apollo/client'
import { Object } from './objectSelector'

interface ObjectSelectorProps{
    onChange?:Function,
}

export default function ObjectSelector(props:ObjectSelectorProps) {
    
  const [ getObjList ] = useLazyQuery(QUERY_OBJ_LIST)
  const [ objList, setObjList ] = useState<Object[]>()
  const { onChange } = props
  
  
  useEffect(() => {
    GetLazyPromise({}, getObjList).then((data1:any) => {
        setObjList(
            data1.objList.map((value: Object) =>(
                {
                    label:value.name,
                    value:value.id
                }
            ))
        )
    }).catch((error) => {
        console.error(error)
        return (
            <NotAvailable/>
        )
    })},[]
  )

    
  
  return (
    <Select
        placeholder="请选择对象"
        optionFilterProp="children"
        onChange={(value, option) => {
            if (onChange) {
                onChange(value,option)
            }
        }}
        options={
            objList
        }
    />
  )
}
