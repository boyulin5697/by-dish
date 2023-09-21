import {gql, LazyQueryExecFunction, LazyQueryHookOptions, OperationVariables} from "@apollo/client";
import {DishInput} from "./pages/Dish/dish";

/**
 * 后台管理系统 graphql - apis
 * 
 * @author by.
 * @since 2023/7/22
 */

/**
 * 为懒加载请求封装promise
 *
 * @param options 请求入参
 * @param fn useLazyQuery产生的请求回调函数
 */
export const GetLazyPromise = (options:LazyQueryHookOptions, fn:LazyQueryExecFunction<any, OperationVariables>) => {
    return new Promise((resolve, reject) => {
        fn(options).then((value) => {
            if(value.error){
                reject(value.error)
            }else{
                while(value.loading){
                    console.log("waiting for api loading...")
                }
                if(value.data.error!=undefined){
                    reject(value.data.error[0].message)
                }
                resolve(value.data)
            }
        })
    })
}

/**
 * Add dish request
 */
export const ADD_DISH = gql`
    mutation AddDish($input:DishInput!){
        addDish(input:$input){
            code,
            message
        }
    }
`

/**
 * Query Dish By Id
 */

export const QUERY_DISH = gql`
    query Dish($input:DishInput){
        dish(input:$input){
            id,name,pic,freq,intType,
            description, avb, label
        }
    }
`

/**
 * Query Dish List
 */
export const QUERY_DISH_LIST = gql`
    query DishList($input:DishInput){
        dishList(input:$input){
            pageNo,
            totalPages,
            data {
                id,name,pic, freq,intType,
                description, avb, label,objs
            }
        }
    }
`
/**
 * Query Dish related objects and
 */
export const QUERY_DISH_OBJS = gql`
    query DishObjList($input:[String]!){
        dishObjList(input:$input){
            dishid,
            dishList{
                id,
                name
            }
        }
    }
`

/**
 * Query Menu
 */
export const QUERY_MENU = gql`
    query Menu($input:MenuInput!){
        menu(input:$input){
            id,time,
            list{
                dishId,
                dishName,
                objArr{
                    objId,
                    objName,
                    label,
                    valId
                }
            },
            typeInt,
            name
        }
    }
`

/**
 * Query Menu list
 */
export const QUERY_MENU_LIST = gql`
    query MenuList($input:MenuListInput!){
        menuList(input:$input){
            pageNo,
            totalPages,
            data {
                id,time,
                list{
                    dishId,
                    dishName,
                    objArr{
                        objId,
                        objName,
                        label,
                        valId
                    }
                },
                typeInt,
                name
            }
        }
    }
`

export const QUERY_OBJ_LIST = gql`
    query objList{
        objList{
            id,
            name
        }
    }
`

export const QUERY_OBJ_VAL_LIST = gql`
    query ObjValList($input:QueryDishObjects){
        objValList(input:$input){
            objid,
            objname,
            valid,
            val,
            label
        }
    }
`

export const QUERY_TYPE_LIST = gql`
    query{
        custTypeList{
            typeid,
            label
        }
    }
`


