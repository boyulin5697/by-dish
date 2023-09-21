import { Block, Input, Text, View, Button, Textarea } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { DishObject, ObjValRel } from '../../order'
import './index.less'

interface ObjectConfigInput {
    dishId:string,
    dic:DishObject[],
    objs:string[],
    addDish:Function
}


export default function ObjectConfig(props:ObjectConfigInput) {

  const [ dishObjs, setDishObjs ] = useState<ObjValRel[]>([])

  const [ dic, setDic ] = useState<DishObject[]>([])

  useEffect(() => {
    setDic(props.dic)
  },[props.dic])

  const getObjLabel = (objid:string) => {
    let objName = ""
    for(let i = 0;i<dic.length;i++){
        let oid = dic[i].objid
        if(oid == Number(objid)){
            objName = dic[i].objname
            break
        }
    }
    return objName
  }
  
  const listObjVals = (objid:string) => {
    let objVals:DishObject[] = []
    for (const key in dic) {
        let oid = dic[key].objid.toString()
        if(oid == objid){
            objVals.push(dic[key])
        }
    }
    return objVals
  }

  const changeInput = (objid:string, content:number | string) => {
    let tmpObjs = dishObjs
    let indexValue = dishObjs.find(value => value.objId == objid)
    if(indexValue){
        indexValue.valId = content.toString()
        setDishObjs([...dishObjs,indexValue])
    }else{
        tmpObjs.push({
            objId:objid,
            valId:content.toString()
        })
        setDishObjs(tmpObjs)
    }
  }

  return (
    <View className="details-padd specs-goods">
        <Text className="specs-goods-text"></Text>
        <View className='specs-goods-flex'>
        <Text className='specs-goods-text'>配置</Text>
        {
            props.objs.map(obj => {
                return (
                    <Block>
                        <View className='specs-goods-flex'>
                        {
                            obj=="1"?
                                    (
                                        <View className='config-line'>
                                             <Text>备注</Text>
                                             <Textarea placeholder="请输入备注"
                                                onBlur={
                                                    (event) =>
                                                    changeInput("1",event.detail.value)
                                                }
                                             ></Textarea>
                                        </View>
                                    ):(
                                        <View className='config-line'>
                                            <Text>{getObjLabel(obj)}</Text>
                                            <br/>
                                            <View className='obj-val-content'>
                                            {
                                                listObjVals(obj).map((val) => {
                                                    return (
                                                        <View>
                                                            <Button className='obj-val-button' plain={true}
                                                                onClick={
                                                                    () => {
                                                                        changeInput(val.objid.toString(),val.valid == undefined?"":val.valid)
                                                                    }
                                                                }
                                                            >
                                                                {val.label}
                                                            </Button>
                                                        </View>
                                                    )
                                                })

                                            }
                                            </View>
                                        </View>
                                    )
                                
                        }
                        </View>
                    </Block>
                )
            })
        }
        </View>
        <Button className='hand-up-button'
            onClick={() => {props.addDish({
                dishId:props.dishId,
                objArr:dishObjs
            })}}>
            配好了！
        </Button>
    </View>
  )
}
