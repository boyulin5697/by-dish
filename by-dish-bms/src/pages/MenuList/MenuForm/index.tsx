import React, {Ref, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {Menu} from "../menu";
import {ModalForm, ProForm, ProFormInstance, ProFormText} from "@ant-design/pro-components";
import {Button, Divider, Form} from "antd";


/**
 * menu表单
 *
 * @author by.
 * @date 2023/7/26
 * @param props
 * @constructor
 */

export interface MenuFormRef {
    showModel: (menu:Menu) => void
}


const MenuForm = React.forwardRef<MenuFormRef, any>(({},ref:Ref<MenuFormRef>) => {

    const menuRef = useRef<ProFormInstance>()

    useImperativeHandle(ref, () => ({
        showModel:showCurrentModel,
    }))

    // const {menu, open, showModel} = props
    const [form] = Form.useForm<Menu>()
    const [menu, setMenu] = useState<Menu>()

    const showCurrentModel = (menu:Menu) => {
        setMenu(menu)
    }

    useEffect(() => {
        menuRef.current?.setFieldsValue({
            menu
        })
    },[menu])

    return (
    <ModalForm<Menu>
        open={menu==undefined?false:!!menu?.list}
        title="查看菜单信息"
        form={form}
        formRef={menuRef}
        initialValues={menu}
        onFinish={async() => setMenu(undefined)}
        modalProps={{
            destroyOnClose:true,
            onCancel:() => setMenu(undefined)
        }}
        // trigger={
        //     <Button
        //         type="link"
        //         style={{color:"#13C2C2"}}
        //         onClick={() => {
        //             showCurrentModel();
        //         }}
        //     >
        //         查看详情
        //     </Button>
        // }
     >
        <h4>基本信息</h4>
        <ProForm.Group>
          <ProFormText
              width="sm"
              name="id"
              label="菜单编号"
              disabled
              //initialValue={menu.id}
          />
          <ProFormText
              key={menu?.name}
              width="sm"
              name="name"
              disabled
              label="菜单名称"
              //initialValue={menu.name}
          />
          <ProFormText
              key={menu?.typeInt}
              width="sm"
              name="typeInt"
              disabled
              label="菜单类型"
              //initialValue={menu.typeInt}
          />
        </ProForm.Group>
        <h4>菜品详情</h4>
        {
            menu?.list!=null?menu.list.map((value,index) => {
              return(
                  <div>
                    <Divider/>
                    <ProForm.Group>
                      <ProFormText
                          key={value.dishId}
                          name={"list["+index+"].dishId"}
                          width="md"
                          disabled
                          label="菜品编号"
                          initialValue={value.dishId}
                      />
                        <ProFormText
                            key={value.dishName}
                            width="md"
                            name={"list["+index+"].dishName"}
                            disabled
                            label="菜品名"
                            initialValue={value.dishName}
                        />
                    </ProForm.Group>
                    <div>
                      {
                          value.objArr.map((objValue, subIndex) => {
                          return(
                              <ProForm.Group>
                                <ProFormText
                                    key={objValue.objName}
                                    width="md"
                                    name={"list["+index+"].objArr["+subIndex+"]"+".objName"}
                                    disabled
                                    label="属性名"
                                    initialValue={objValue.objName}
                                />
                                <ProFormText
                                    key={objValue.valId}
                                    name={"list["+index+"].objArr["+subIndex+"]"+".label"}
                                    width="md"
                                    disabled
                                    label="值"
                                    initialValue={objValue.label == ''?objValue.valId:objValue.label}
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
})
export default MenuForm;
