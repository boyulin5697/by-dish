package entities

import "ByDishBackend/db"

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
