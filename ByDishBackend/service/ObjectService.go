package service

import (
	"ByDishBackend/db"
	"ByDishBackend/graph/model"
)

func GetObjectList() []*model.ObjValContent {
	var obj []*model.ObjValContent
	rows, _ := db.Db.Raw("SELECT val_id valid, name, label, val FROM `v_obj_values`").Rows()
	for rows.Next() {
		var objItem model.ObjValContent
		err := db.Db.ScanRows(rows, &objItem)
		if err != nil {
			return nil
		}
		obj = append(obj, &objItem)
	}
	return obj
}
