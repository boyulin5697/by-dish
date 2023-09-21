import { Image, View, Text, Block } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { Dish } from '../../order'
import './index.less'
import '../../../../../style/shadow.css'

export interface CartInput{
  dishes?:Dish[],
  clearCart:Function,
  closeCart:Function
}

export default function Cart(props:CartInput) {

  const [cartDishes, setCartDishes] = useState<Dish[]>()

  useEffect(() => {
    setCartDishes(props?.dishes)
  }, [props.dishes])

  return (
    <View>
        {/* 清空所有按钮 */}
        <View className='details-back'
          onClick={() => props.closeCart()}>
            <View className='empty'>
              <Image src="https://static-1305486145.cos.ap-guangzhou.myqcloud.com/qingkong.svg" mode="widthFix"/>
              <Text onClick={() => props.clearCart}>清空已点</Text>
            </View>
          </View>
          {/* 商品列表 */}
         {
            cartDishes?.map(value => (
                <Block>
                    <View className='goods-list'>
                        <View className='goods-list-image'>
                            <Image src={value?.pic} mode="aspectFill"/>
                            <View className='goods-list-name'>
                              <View>{value?.name}</View>
                            </View>
                        </View>
                    </View> 
                </Block>
                
            ))  
         }
    </View>
  )
}
