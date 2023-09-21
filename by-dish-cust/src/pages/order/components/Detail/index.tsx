import { Image, Text, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { Dish, DishObject } from '../../order'
import './index.less'
import '../../../../../style/shadow.css'
import ObjectConfig from './ObjectConfig'

interface DetailInput{
  detail:Dish,
  objs:DishObject[],
  close:Function,
  addDish:Function
}


export default function Detail(props:DetailInput) {

  const [ detail, setDetail ] = useState<Dish>()

  useEffect(() => {
    setDetail(props?.detail)
  },[props.detail])

  return (
    <View className='details-back'>
      <View className='goods-details coup-anim'>
        <View className='goods-image'>
          <Image src={detail?.pic?detail?.pic:""} mode='widthFix'></Image>
          <Image src="https://static-1305486145.cos.ap-guangzhou.myqcloud.com/guanbi.png"
          mode= 'widthFix'
          onClick={() => props.close()}></Image>
        </View>
        <View className='details-padd'>
          <View className='details-name'>{detail?.name}</View>
          <View className='details-Thinning'>已点{detail?.freq}份</View>
          <View className='describe'>
            <View className='details-unit-price'>
              <Text>
                {detail?.description}
              </Text>
            </View>
          </View>
        </View>
        {/* 规格配置 */}
        <ObjectConfig
          dishId={props.detail.id}
          dic={props.objs}
          objs={props.detail.objs??[]}
          addDish={props.addDish}
        />
        <View style={{"height":"120px"}}/>
      </View>
    </View>
  )
}
