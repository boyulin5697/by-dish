import {gql, LazyQueryExecFunction, LazyQueryHookOptions, OperationVariables} from "@apollo/client";


/**
 * 客户端 graphql - apis
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
export const CUST_ADD_MENU = gql`
    mutation CustAddMenu($input:CustAddMenuInput!){
        custAddMenu(input:$input){
            code,
            message
        }
    }
`

export const CUST_QUERY_OBJ_VAL_LIST = gql`
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

export const CUST_QUERY_TYPE_LIST = gql`
    query{
        custTypeList{
            typeid,
            label
        }
    }
`

export const CUST_DISH_LIST = gql`
    query CustDishList($input:CustDishInput){
        custDishList(input:$input){
            typeid,
            dishes{
                id,
                name,
                pic,
                freq,
                intType,
                description,
                label,
                objs
            }
        }
    }
`




