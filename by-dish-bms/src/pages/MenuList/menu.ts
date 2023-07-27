export interface MenuInput{
    id:string
}

export interface MenuListInput{
    pageNo:number,
    pageSize:number,
    name?:string,
    typeInt?:number,
    time?:string
}

export type Menu = {
    id:string
    time:string
    list:TDishObjsVal[],
    typeInt:number,
    name:string
}

export type TDishObjsVal = {
    dishId:string,
    objArr:TObjValRel[]
}

export type TObjValRel = {
    objId:string,
    objName?:string,
    label?:string,
    valId:string
}

export interface MenuListResponse{
    pageNo:number,
    pageSize:number,
    data:[Menu]
}
