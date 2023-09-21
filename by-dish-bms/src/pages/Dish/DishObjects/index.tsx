import React, {useState} from 'react'
import {useLazyQuery} from '@apollo/client';
import {GetLazyPromise, QUERY_OBJ_VAL_LIST} from '../../../apis';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import NotAvailable from '../../NotAvailable';
import BmsSpinning from '../../../components/BmsSpinning';
import { ObjectValue } from "../dish";
import BmsObjectSelector from '../../../components/BmsObjectSelector';

/**
 * Dish Object相关页面
 *
 * @author by.
 * @date 2023/8/6
 */

export default function DishObjects() {
  //加载中spin
  const [spin,setSpin] = useState<boolean>(false)
  const [ objValList, setObjValList ] = useState<ObjectValue[]>([])

  const [ getObjValList ] = useLazyQuery(QUERY_OBJ_VAL_LIST)

  const columns:ProColumns<ObjectValue>[] = [
    {
      hideInTable:true,
      title:'对象值编号',
      width: 120,
      dataIndex: 'valid',
    },
    {
      title:'对象值',
      width:70,
      dataIndex:'val',
    },
    {
      title:'对象值标签',
      width:70,
      dataIndex:'label',
    },
    {
      title:'对象编号',
      width:70,
      dataIndex:'objid',
    },
    {
      title:'对象名',
      width:70,
      dataIndex:'objname'
    }
  ]

  return (
      <div>
        <div>
          <BmsSpinning
              loading={spin}/>
        </div>
        <div>
          <ProTable<ObjectValue>
              columns={columns}
              dataSource={objValList}
              headerTitle={false}
              search={false}
              pagination={false}
              toolBarRender={() => [
                <div>
                    <span>对象名：</span>
                    <BmsObjectSelector
                        onChange={(value: any) => {
                            setSpin(true)
                            GetLazyPromise({
                                variables:{
                                    input:{
                                        objid:value
                                    }
                                }
                            }, getObjValList).then((data:any) => {
                                setObjValList(data.objValList)
                                setSpin(false)
                            }).catch((error) => {
                                console.error(error)
                                return (
                                    <NotAvailable/>
                                )
                            })
                        }}
                    />
                </div>
              ]}
          />
        </div>
      </div>
  )
}

