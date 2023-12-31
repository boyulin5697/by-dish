package entities

import "ByDishBackend/db"

// ObjRelation 对象关系 @author by. since 2023/7/15

type ObjRelation struct {
	Id         int    `json:"id"`
	Menu       string `json:"menu"`
	Dish       int    `json:"dish"`
	ObjId      int    `json:"objId"`
	ObjContent string `json:"objContent"`
}

func (ObjRelation) TableName() string {
	return "menu_dish_obj"
}

func (rela *ObjRelation) AddObjRelation() {
	db.Db.Create(rela)
}
