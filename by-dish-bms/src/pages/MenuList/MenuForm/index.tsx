import React from 'react'
import {Menu} from "../menu";
import {ModalForm, ProForm, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";


/**
 * menu表单
 *
 * @author by.
 * @date 2023/7/26
 * @param props
 * @constructor
 */
export default function MenuForm(props:Menu) {
  const [form] = Form.useForm<Menu>()
  return (
    <ModalForm<Menu>
        title="查看菜单信息"
        form={form}
     >
        <ProForm.Group>
          <ProFormText
              width="sm"
              name="id"
              label="菜单编号"
              disabled
              initialValue={props.id}
          />
          <ProFormText
              width="sm"
              name="name"
              disabled
              label="菜单名称"
              initialValue={props.name}
          />
          <ProFormText
              width="sm"
              name="typeInt"
              disabled
              label="菜单名称"
              initialValue={props.typeInt}
          />
        </ProForm.Group>
        {
            props.list!=null?props.list.map(value => {
              return(
                  <div>
                    <ProForm.Group>
                      <h5>菜品详情</h5>
                      <ProFormText
                          width="xl"
                          name="dishId"
                          disabled
                          label="菜品编号"
                          initialValue={value.dishId}
                      />

                      {/*这里得加上菜品名称*/}
                    </ProForm.Group>
                    <div>
                      {
                        value.objArr.map(objValue => {
                          return(
                              <ProForm.Group>
                                <ProFormText
                                    width="xs"
                                    name="objName"
                                    disabled
                                    label="属性名"
                                    initialValue={objValue.objName}
                                />
                                <ProFormText
                                    width="xs"
                                    name="label"
                                    disabled
                                    label="值"
                                    initialValue={objValue.label}
                                />
                              </ProForm.Group>
                          )
                        })
                      }
                    </div>
                  </div>
              )
            }):undefined
        }
    </ModalForm>
  )
}
