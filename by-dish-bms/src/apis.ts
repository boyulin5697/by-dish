import { gql } from "@apollo/client";

/**
 * 后台管理系统 graphql - apis
 * 
 * @author by.
 * @since 2023/7/22
 */


/**
 * Add dish request
 */
export const ADD_DISH = gql`
    mutation AddDish($input:AddDishInput!){
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
            id,name,pic, freq,intType,
            description, avb, label
        }
    }
`
/**
 * Query Dish related objects and
 */
export const QUERY_DISH_OBJS = gql`
    query DishObjList($input:String!){
        dishObjList(input:$input){
            objId,
            valList{
                valid
                label,
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
            id,time,
            list{
                dishId,
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