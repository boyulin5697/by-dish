import { Block, ScrollView, View, Text, Image, Button } from '@tarojs/components'
import React, {useEffect, useRef, useState} from 'react'
import Detail from './components/Detail'
import Cart from './components/Cart'
import { Dish, DishObject, DishObjsVal, TypeDishObject, TypeObject } from './order'
import { CUST_ADD_MENU, CUST_DISH_LIST, CUST_QUERY_OBJ_VAL_LIST, CUST_QUERY_TYPE_LIST, GetLazyPromise } from '@/apis/graphqlApis'
import { useLazyQuery, useMutation } from '@apollo/client'
import './index.less'
import Taro from '@tarojs/taro'

export default function Order() {

  const [ queryTypeList ] = useLazyQuery(CUST_QUERY_TYPE_LIST)

  const [ queryObjValList ] = useLazyQuery(CUST_QUERY_OBJ_VAL_LIST)

  const [ queryCustDishList ] = useLazyQuery(CUST_DISH_LIST)

  const [ addMenu, { data,loading,error}  ] = useMutation(CUST_ADD_MENU)

  const [ left, setLeft ] = useState<TypeObject[]>()
  const [ right, setRight ] = useState<TypeDishObject[]>()
  const [ allDishes, setAllDishes] = useState<Dish[]>()

  const [ objAndVal, setObjAndVal] = useState<DishObject[]>([])
  const [ cart, setCart ] = useState<string[]>([])

  const trigger = useRef(-1)

  const scrollInto = useRef("")

  //最终上传的菜单数据
  const [ handUp, setHandUp ] = useState<DishObjsVal[]>([])

  const [scrollConfig, setConfig] = useState({
    heightset: [0], //存储右边每一个分类菜品的高度
    tophei: 0, //滚动时距离顶部的高度
    scroll_into: ''
  })

  const [ openCart, setOpenCart ] = useState<boolean>(false)
  const [ currentDetail, setCurrentDetail ] = useState<Dish>()

  useEffect(() => {
    //请求typelist
    GetLazyPromise({}, queryTypeList).then((data:any) => {
        setLeft(
            data.custTypeList
        )
    }).catch((error) => {
        console.error(error)
    })


    //请求objlist
    GetLazyPromise({
        variables:{
            input: {
                objid:0
            }
        }
    }, queryObjValList).then((data:any) => {
        setObjAndVal(
            data.objValList
        )
    }).catch((error) => {
        console.error(error)
    })
  },[])

  useEffect(() => {
    if(left){
         //请求菜品列表
        GetLazyPromise({
            variables:{
                input:{
                    typeidList:left?.map(value => {
                        return value.typeid
                    }),
                    wish:1
                }
            }
        }, queryCustDishList).then((data:any) => {
            let dishes:Dish[] = []
            data.custDishList.forEach(element => {
                element.dishes?.forEach(element1 => {
                    dishes.push(element1)
                });
            });
            setRight(data.custDishList)
            setAllDishes(dishes)
        }).catch((error) => {
            console.error(error)
        })
    }
  },[left])

  useEffect(() => {
    let tmpHeightSet :number[]= []
    if(right?.length){
      for (let i = 0;i<right?.length;i++){
        tmpHeightSet.push(200)
      }
    }
    setConfig({
      ...scrollConfig,
      heightset: tmpHeightSet
    })

  },[right])

  //滚动监听事件
  const scrollEvent = (event) => {
    console.log(event.detail.scrollTop)
	let scrollTop = event.detail.scrollTop
	if (scrollTop >= scrollConfig.tophei) { //上拉
		// 当前分类商品的高度小于滚动高度时跳转下一个分类
		if (scrollTop >= scrollConfig.heightset[trigger.current]) {
			trigger.current += 1
		}
	} else { //下拉
		// 当前分类商品的高度大于滚动高度时跳转下一个分类
		if (scrollTop < scrollConfig.heightset[trigger.current - 1]) {
		    trigger.current -= 1
		}
		}
    setConfig({
        ...scrollConfig,
        tophei:scrollTop
    })
  }

  //点击类目加上背景色
  const itemIze = (index, typeId) => {
    trigger.current = index
    scrollInto.current = typeId
    setTimeout(() => {
      scrollInto.current = ""
    },200)
  }

  //获取购物车菜品列表
  const getCartDishes = (cart:string[]) => {
    let cartDishes:Dish[] = []
    cart.forEach(value => {
        let dish = allDishes?.find((dish) => dish.id==value)
        if(dish!=undefined){
            cartDishes.push(dish)
        }
    })
    return cartDishes
  }

  //清空购物车
  const clearCart = () => {
    setCart([])
    setHandUp([])
  }

  //关闭购物车
  const closeCart = () => {
    setOpenCart(false)
  }

  //关闭详情
  const closeDetail = () => {
    setCurrentDetail(undefined)
  }

  //获取类型标签
  const getTypeLabel = (typeid:number) => {
    let label = ""
    left?.find(value => {
        if(typeid == value.typeid){
            label = value.label
        }
    })
    return label
  }

  //添加菜品到菜单
  const addDish = (dish:DishObjsVal) => {
    let dishList = handUp
    let cartList = cart
    dishList.push(dish)
    cartList.push(dish.dishId)
    setHandUp(dishList)
    setCart(cartList)
    setCurrentDetail(undefined)
  }

  //提交菜单
  const addCustMenu = () => {
    if(handUp.length==0){
        Taro.showToast({
            title:'请选择至少一道菜!',
            duration:3000,
            icon:'error',
            mask:true
        })
    }else{
        addMenu({
            variables:{
                input:{
                    dishList:handUp
                }
            }
        })
        if(error){
            Taro.hideLoading()
            Taro.showToast({
                title:'提交菜单失败!',
                duration:3000,
                icon:'error',
                mask:true
            })
        }else if(loading){
            Taro.showLoading()
        }else{
            Taro.hideLoading()
            Taro.showToast({
                title:'提交菜单成功，请等待美味来袭！',
                duration:3000,
                icon:'success',
                mask:true
            })
          setCart([])
          setHandUp([])
        }
    }
}


  return (
    <View className="order-view">
        <View className='commodity'>
        <View className='order-left'>
            <ScrollView scrollY={true}
                        className='scroll-Hei'
                        scrollWithAnimation={true}
                        enhanced={true}
                        showScrollbar={false}

            >
                {
                    left?.map((value,index) => (
                        <Block>
                            <View className='itemize-text'
                                  hoverClass={"active: "+trigger.current}
                                  id={value.typeid.toString()}
                                  onClick={() => itemIze(index, value.typeid.toString())}
                            >
                                <Text>{value.label}</Text>
                                {/* <Text>111</Text> */}
                            </View>
                        </Block>
                    ))
                }
            </ScrollView>
        </View>
        <View className='order-right'>
            <ScrollView
                scrollY={true}
                className='scroll-Hei'
                scrollWithAnimation={true}
                enhanced={true}
                showScrollbar={false}
                scrollIntoView={scrollInto.current}
                onScroll={(event) => scrollEvent(event)}
            >
            {
                right?.map(value => (
                    <Block key={value.typeid}>
                    <View
                       id={value?.typeid.toString()}
                       className='rig-height'
                    >
                        <View className='classif'>{getTypeLabel(value.typeid)}</View>
                        {
                            value.dishes.map(dish => {
                                return (
                                    <View id={dish.id} className='classif-goods'>
                                        <View className='goods-image'>
                                            <Image src={dish.pic} mode='aspectFill'/>
                                        </View>
                                        <View className='goods-Price'>
                                            <View className='goods-name'>
                                                <Text className='Bold'>
                                                    {dish.name}
                                                </Text>
                                                <Text className='Thinning'>
                                                    {dish.freq}已点
                                                </Text>
                                            </View>
                                        </View>
                                        <View className='quantity specs-view'
                                            onClick={() => {
                                                setCurrentDetail(dish)
                                            }}
                                        >
                                            <Text>选规格</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    </Block>
                ))
            }
            <View style={{"height":"400px"}}/>
            </ScrollView>
        </View>
        <View className='order-bottom'>
                <View className='Shopping'>
                    <View className='Shopping-left'
                        onClick={() => {
                            if(!currentDetail){
                                setOpenCart(!openCart)
                            }
                        }}>
                        <Image src='https://static-1305486145.cos.ap-guangzhou.myqcloud.com/gouwuche.png' mode='widthFix'></Image>
                    </View>
                </View>
                <View className="Shopping-title">已点{cart?cart.length:0}份菜品</View>
				<View className="place-order">
					<Button plain={true}
                        onClick={() => addCustMenu()}
                    >选好了</Button>
				</View>
        </View>
        {
            openCart?<Cart
                dishes={getCartDishes(cart)}
                clearCart={clearCart}
                closeCart={closeCart}
            />:undefined
        }
        {
            currentDetail!= undefined?
            <Detail
                objs={objAndVal}
                detail={currentDetail}
                close={closeDetail}
                addDish={addDish}
                />:undefined
        }
        </View>
    </View>
  )
}
