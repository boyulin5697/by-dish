import React, {useEffect, useState} from 'react';
import {
    StepsForm,
    ProFormText,
    ProFormSelect,
    ProFormTextArea,
} from '@ant-design/pro-form';

import ProCard from '@ant-design/pro-card';
import {DoPost} from "../../../apis/request";
import useAuth from "../../../hooks/Auth";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_DISH, GetLazyPromise, QUERY_OBJ_LIST} from "../../../apis";
import { ProFormList, ProFormUploadDragger} from "@ant-design/pro-components";
import {Object} from "../dish";
import NotAvailable from "../../NotAvailable";
import BmsTypeSelector from '../../../components/BmsTypeSelector';
import {message} from "antd";

export default function AddDishPage() {
    const { tokenHeader } = useAuth()

    const [messageApi, contextHolder] = message.useMessage();

    const [ addDish, {data,loading,error} ] = useMutation(ADD_DISH)

    const [ queryObjectVals ] = useLazyQuery(QUERY_OBJ_LIST)

    const [ dishObjs, setDishObjs ] = useState<Object[]>()

    const [ filePath, setFilePath ] = useState<string>("");

    const showMessage = (text:string, type?:number) => {
        let typeInt = type??0
        switch (typeInt){
            case 0: messageApi.info(text); break;
            case 1: messageApi.success(text); break;
            case 2: messageApi.warning(text); break;
            case 3: messageApi.loading(text); break;
            case 4: messageApi.error(text); break;
            default:
                messageApi.info(text)
                break;
        }
    }

    useEffect(() => {
        GetLazyPromise({
            variables:{
                input: {
                    objid:0
                }
            }
        }, queryObjectVals).then((data:any) => {
            setDishObjs(
                data.objList
            )
        }).catch((error) => {
            console.error(error)
            return (
                <NotAvailable/>
            )
        })
    },[])

    return (
        <div>
        {contextHolder}
        <ProCard>
            <StepsForm
                formProps={{
                    validateMessages: {
                        required: '此项为必填项',
                    },
                }}
                onFinish={
                     async (values) => {
                         values = {
                            ...values,
                            objs:values.objs.map((value: { obj: any; }) => (value.obj)),
                            "pic":filePath,
                            avb:1
                         }
                         delete values.picFile
                         await addDish({variables: {input: values}})
                         if(error) {
                             showMessage(data.errors[0].message,4)
                             return false
                         }
                         showMessage("新增成功",1)
                         return true;
                     }
                }
            >
                <StepsForm.StepForm
                    name="base"
                    title="填写菜品基本信息"
                    onFinish={async () => {
                        return true;
                    }}
                >
                    <ProFormText
                        name="name"
                        label="菜品名称"
                        tooltip="这道菜叫什么"
                        placeholder="请输入名称"
                        width="lg"
                        rules={[{ required: true }]}
                    />
                    <ProFormTextArea name="description" label="描述" width="lg" placeholder="请输入菜品描述"
                                     rules={[{ required: true }]}/>
                    <BmsTypeSelector/>
                </StepsForm.StepForm>
                <StepsForm.StepForm name="checkbox" title="上传图片">
                    <ProFormUploadDragger max={1}
                        name="picFile"
                        action={(file) => {
                                const toBeUpload = new FormData()
                                toBeUpload.append('file',file)
                                return DoPost(
                                    toBeUpload,
                                    "/document/nt/upload",
                                    tokenHeader,"form").then((value) => {
                                    if (value.resp.code == 200) {
                                        setFilePath(value.resp.data)
                                        return "上传成功！"
                                    }else{
                                        return "上传失败！"
                                    }
                                })
                            }
                        }
                    />
                </StepsForm.StepForm>
                <StepsForm.StepForm name="time" title="配置对象参数并发布">
                    <ProFormList
                        name="objs"
                        creatorButtonProps={{
                            position:'top',
                            creatorButtonText:"添加对象配置"
                        }}
                    >
                        <ProFormSelect
                            key="obj"
                            name="obj"
                            options={
                                dishObjs?.map(value => ({
                                    label:value.name,
                                    value:value.id
                                }))
                            }
                        />
                    </ProFormList>

                </StepsForm.StepForm>
            </StepsForm>
        </ProCard>
        </div>
    );
};
