package service

import (
	"ByDishBackend/db"
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"database/sql"
)

// bms(A) 端object相关接口服务 @author by.

// GetObjectBasicList 获取Object基本列表
func GetObjectBasicList() []*model.Object {
	list := entities.GetObjList()
	var resultArr []*model.Object
	for i := range list {
		result := &model.Object{
			ID:   list[i].Id,
			Name: list[i].Name,
		}
		resultArr = append(resultArr, result)
	}
	return resultArr
}

// GetObjectList 获取Object-value列表
func GetObjectList(input *model.QueryDishObjects) []*model.ObjectValue {
	var obj []*model.ObjectValue
	var rows *sql.Rows
	if input.Objid == nil || *input.Objid == 0 {
		rows, _ = db.Db.Raw("SELECT o.id objid, o.name objname,\n       " +
			"v.id valid, v.value val,\n       " +
			"v.label\n       " +
			"FROM `object` as o\n       " +
			"LEFT JOIN\n       " +
			"`obj_values` as v\n       " +
			"on o.id = v.object\n" +
			"WHERE o.usable = 1" +
			";").Rows()
	} else {
		rows, _ = db.Db.Raw("SELECT o.id objid, o.name objname,\n       "+
			"v.id valid, v.value val,\n       "+
			"v.label\n       "+
			"FROM `object` as o\n       "+
			"LEFT JOIN\n       "+
			"`obj_values` as v\n       "+
			"on o.id = v.object\n"+
			"WHERE o.usable = 1 "+
			"AND o.id = ?", input.Objid).Rows()
	}
	if rows != nil {
		for rows.Next() {
			var objItem model.ObjectValue
			err := db.Db.ScanRows(rows, &objItem)
			if err != nil {
				return nil
			}
			obj = append(obj, &objItem)
		}
	}
	return obj
}
