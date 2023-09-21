/**
 * Dish 相关类型
 * 
 * @author by.
 * @date 2023/7/26
 */

export type Dish = {
    id:string,
    name?:string,
    pic?:string,
    freq?:number,
    intType?:number,
    description?:string,
    avb?:number,
    label?:string[],
    objs?:string[]
}

export interface DishInput{
    id?:string,
    name?:string,
    pic?:string,
    freq?:number,
    intType?:number,
    description?:string,
    avb?:number,
    label?:string[],
    pageNo?:number,
    pageSize?:number,
    objs?:string[]
}

export type ObjValList = {
    objId:string,
    valList:ObjValContent[]
}

export type ObjValContent = {
    valid:string,
    label:string,
    val:number
}

export interface DishListResponse{
    pageNo:number,
    pageSize:number,
    data:[Dish]
}

export type ObjectValue = {
    objid:number,
    objname:string,
    valid?:number,
    val?:number,
    label?:string
}

export type Object = {
    id:number,
    name:string,
}

export type QueryDishObjects = {
    objid:number
}

export type DishObj = {
    dishid:string,
    dishList:Object[]
} | undefined
