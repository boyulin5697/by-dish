import React, {useEffect, useRef, useState} from 'react'
import {Button, Form} from "antd";
import {ModalForm, ProForm, ProFormInstance, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {Dish, DishObj, ObjValList} from "../dish";
import {GetLazyPromise, QUERY_DISH_LIST, QUERY_DISH_OBJS} from "../../../apis";
import {useLazyQuery} from "@apollo/client";
import NotAvailable from "../../NotAvailable";
import BmsSpinning from '../../../components/BmsSpinning';

export default function DishForm(props:{
  dish:Dish
}) {
    const [ spinning, setpinning ] = useState<boolean>(false)
    const formRef = useRef<ProFormInstance>()
    const { dish } = props
    const [ dishContent, setDishContent ] = useState<Dish>({
        id:"",
        name:"",
        pic:"",
        freq:0,
        intType:0,
        description:"",
        avb:1,
    })
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const [form] = Form.useForm<Dish>()
    const [ getQueryDishObjs ] = useLazyQuery(QUERY_DISH_OBJS)
    const [ dishObjs, setDishObs ] = useState<DishObj>()

    useEffect(() => {
        setDishContent(dish)
    },[dish])

    useEffect(() => {
        setpinning(true)
        if(isOpen&&dish.id !== ""){
            GetLazyPromise({
                variables:{
                    input: [dish.id]
                }
            }, getQueryDishObjs).then((data:any) => {
                setDishObs(
                    () => {
                        if(data.dishObjList === undefined){
                            return undefined
                        }else if(data.dishObjList.length === 0){
                            return undefined
                        }else{
                            return data.dishObjList[0]
                        }
                    }
                )
            }).catch((error) => {
                console.error(error)
                return (
                    <NotAvailable/>
                )
            })
        }
    },[isOpen])

    //使obj列表在请求后重新设值
    useEffect(() => {
        formRef.current?.setFieldsValue({
            ...dishContent,
            ...dishObjs
        })
        setpinning(false)
    },[dishObjs])

  return (
      <ModalForm<Dish>
          open={false}
          formRef={formRef}
          title="查看菜单信息"
          form={form}
          initialValues={{
            ...dishContent,
            ...dishObjs
          }}
          onFinish={async() => {
            return false
          }}
          trigger={
              <Button
                  type="link"
                  style={{color:"#13C2C2"}}
                  onClick={() => {
                    setOpen(true)
                  }}
              >
                  查看详情
              </Button>
          }
      >
        <BmsSpinning loading = {spinning}/>
        <h4>基本信息</h4>
          <ProForm.Group>
              <ProFormText
                  width="md"
                  name="id"
                  label="菜品编号"
                  disabled
              />
              <ProFormText
                  width="md"
                  name={"name"}
                  disabled
                  label="菜品名称"
              />
          </ProForm.Group>
          <ProForm.Group>
              <ProFormText
                  width="md"
                  name="intType"
                  label="菜品类型"
                  disabled
              />
              <ProFormText
                  width="md"
                  name={"freq"}
                  disabled
                  label="点单频率"
              />
          </ProForm.Group>
          <ProForm.Group>
              <ProFormTextArea
                  width="xl"
                  name="description"
                  disabled
                  label="描述"
              />
          </ProForm.Group>
        <h4>菜品对象配置详情</h4>
        {
            dishObjs?.dishList==null||false?undefined:dishObjs.dishList.map((value, index) => {
            return(
                <div>
                  <ProForm.Group>
                    <ProFormText
                        width="sm"
                        key={index+"id"}
                        id={index+"id"}
                        name={"dishList["+index+"].id"}
                        disabled
                        label="对象编号"
                        initialValue={value.id}
                    />
                    <ProFormText
                        width="sm"
                        key={index+"name"}
                        id={index+"name"}
                        name={"dishList["+index+"].name"}
                        disabled
                        label="对象名称"
                        initialValue={value.name}
                    />
                  </ProForm.Group>
                </div>
            )})
        }
      </ModalForm>
  )
}
