import request from "umi-request";
import apiConfig from '../env'

/**
 * 基于umi-request封装的http请求
 *
 * @author by.
 * @since 2022/9/8
 */

export interface Response<T = any>{
    code:number,
    message:string,
    data?:T,
    time:string
}

export interface ApiResults<T = any>{
    resp: Response<T>;
}

/**
 * Rewrite post method
 * @param data
 * @param url
 */
let api:string;

if(process.env.NODE_ENV=='development'){
    api = apiConfig.development.API;
}else{
    api = apiConfig.production.API;
}

export const DoPost = (data:any,url:string, headers?:Record<string,string>, reqType?:any) => {
    const promise: Promise<ApiResults> = new Promise((resolve) => {
        request.post(
            api+url,
            {
                requestType:reqType??"json",
                headers:{
                    ...headers
                },
                data:data,
                errorHandler: (error: any) => {
                    console.error(error)
                    return error
                },
            }
        ).then((resp: Response) => {
            resolve({
                resp,
            })
        }).catch((error:Error) => {
            resolve({resp:{code:500,message:error.message,time:''}});
        });
    })
    return promise
}

/**
 * Rewrite Get operations
 * @param params
 * @param url
 * @returns
 */
export const DoGet = (params:any,url:string, headers?:Record<string,string>) => {
    const promise: Promise<ApiResults> = new Promise((resolve) => {
        request.get(
            api+url,
            {
                params:params===undefined?undefined:params,
                errorHandler: (error) => {
                    console.error(error)
                    return error
                },
                headers:{
                    ...headers,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        ).then((resp: Response) => {
            resolve({
                resp,
            })
        }).catch((error:Error) => {
            resolve({resp:{code:500,message:error.message,time:''}});
        });
    })
    return promise;
}