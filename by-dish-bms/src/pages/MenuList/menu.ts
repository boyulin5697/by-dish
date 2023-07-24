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
    objId:string,
    objName:string,
    label:string,
    valId:string
}