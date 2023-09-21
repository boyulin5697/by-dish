export type DishObject = {
    objid:number,
    objname:string,
    valid?:number,
    val?:number,
    label:string
}

export type TypeObject = {
    typeid:number,
    label:string
}

export type Dish = {
    id:string,
    name:string,
    pic:string,
    freq: number,
    intType: number,
    description:string,
    avb:number,
    label?:string[],
    objs?:string[]
}

export type TypeDishObject = {
    typeid:number,
    dishes:Dish[]
}

export type QueryDishObjects = {
    objid:number
}

export type CustDishInput = {
    typeidList:number[],
    wish?:number
}

export type ObjValRel = {
    objId:string,
    valId:string
}

export type DishObjsVal = {
    dishId:string,
    objArr:ObjValRel[]
}


export type CustAddMenuInput = {
    dishList:DishObjsVal[]
}