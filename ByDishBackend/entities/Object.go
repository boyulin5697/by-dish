package entities

import "ByDishBackend/db"

// Object 菜品对象 @author by. since 2023/8/25

type Object struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Usable bool   `json:"usable"`
}

type ResultStr struct {
	label string
}

func (Object) TableName() string {
	return "object"
}

// GetObjValLabel 根据 objvalue 获取 值名称
func GetObjValLabel(valId string) string {
	var label string
	valInt := db.StrToNum(valId)
	row := db.Db.Raw("SELECT label From `obj_values` WHERE `id` = ?", &valInt).Row()
	row.Scan(&label)
	return label
}

// GetObjList 获取对象列表
func GetObjList() []*Object {
	obj := new([]*Object)
	db.Db.Find(obj)
	return *obj
}

// GetObjListByIds 根据对象id批量获取对象列表
func GetObjListByIds(ids []*string) []*Object {
	var objList []*Object
	for _, id := range ids {
		if id != nil && *id != "" {
			obj := new(Object)
			db.Db.First(obj, db.StrToNum(*id))
			objList = append(objList, obj)
		}
	}
	return objList
}
