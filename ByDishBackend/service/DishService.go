package service

import (
	"ByDishBackend/db"
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
)

// bms(A) 端dish相关接口服务 @author by.

// AddDish 添加dish
func AddDish(dish *model.DishInput) int {
	if dish.Pic == nil {
		dish.Pic = new(string)
		*dish.Pic = ""
	}
	if dish.Avb == nil {
		dish.Avb = new(int)
		*dish.Avb = 0
	}
	if dish.Freq == nil {
		dish.Freq = new(int)
		*dish.Freq = 0
	}
	if dish.Description == nil {
		dish.Description = new(string)
		*dish.Description = ""
	}
	if dish.IntType == nil {
		dish.IntType = new(int)
		*dish.IntType = 13
	}
	if dish.Objs == nil {
		return -1
	}

	newdish := &entities.Dish{
		Name:        *dish.Name,
		Pic:         *dish.Pic,
		Freq:        *dish.Freq,
		Description: *dish.Description,
		Avb:         *dish.Avb,
		Type:        *dish.IntType,
		Label:       db.ArrToStr(dish.Label),
		Objs:        db.ArrToStr(dish.Objs),
	}

	return newdish.AddDish()
}

// UpdateDish 更新dish
func UpdateDish(dish *model.DishInput) int {
	newdish := &entities.Dish{
		Id:          db.StrToNum(*dish.ID),
		Name:        *dish.Name,
		Pic:         *dish.Pic,
		Freq:        *dish.Freq,
		Description: *dish.Description,
		Avb:         *dish.Avb,
	}

	return newdish.Save()
}

// SearchForDish 搜索dish
func SearchForDish(dishIn *model.DishInput) *model.Dish {
	dish := entities.Dish{
		Id: db.StrToNum(*dishIn.ID),
	}
	dish = *dish.SearchForDish()
	result := model.Dish{
		ID:          db.NumToStr(dish.Id),
		Name:        &dish.Name,
		Pic:         &dish.Pic,
		Freq:        &dish.Freq,
		Description: &dish.Description,
		Avb:         &dish.Avb,
		Label:       db.StrToArr(dish.Label),
		Objs:        db.StrToArr(dish.Objs),
	}
	return &result
}

// SearchForDishList 搜索dish列表
func SearchForDishList(dishIn *model.DishInput) *model.DishListResponse {
	var dishList *[]entities.Dish
	var dish entities.Dish
	var total int
	if dishIn.IntType != nil && dishIn.Avb != nil {
		dish = entities.Dish{
			Name: db.StrNilCheck(dishIn.Name),
			Type: db.NumNilCheck(dishIn.IntType),
			Avb:  db.NumNilCheck(dishIn.Avb),
		}
	} else if dishIn.IntType != nil && dishIn.Avb == nil {
		dish = entities.Dish{
			Name: db.StrNilCheck(dishIn.Name),
			Type: db.NumNilCheck(dishIn.IntType),
			Avb:  1,
		}
	} else if dishIn.IntType == nil && dishIn.Avb == nil {
		dish = entities.Dish{
			Name: db.StrNilCheck(dishIn.Name),
			Avb:  1,
		}
	} else {
		dish = entities.Dish{
			Name: db.StrNilCheck(dishIn.Name),
			Avb:  db.NumNilCheck(dishIn.Avb),
		}
	}
	var resultList []*model.Dish
	dishList, total = dish.FindDishList(*dishIn.PageNo, *dishIn.PageSize)
	dishArr := *dishList
	for i := 0; i < len(dishArr); i++ {
		value := dishArr[i]
		resultList = append(resultList, &model.Dish{
			ID:          db.NumToStr(value.Id),
			Name:        &value.Name,
			Description: &value.Description,
			Pic:         &value.Pic,
			Freq:        &value.Freq,
			IntType:     &value.Type,
			Avb:         &value.Avb,
			Label:       db.StrToArr(value.Label),
			Objs:        db.StrToArr(value.Objs),
		})
	}
	return &model.DishListResponse{
		PageNo:     dishIn.PageNo,
		TotalPages: &total,
		Data:       resultList,
	}
}

// DishObjList 获取dish相关obj和关联值
func DishObjList(ids []*string) []*model.DishObj {
	if ids != nil {
		var finalResult []*model.DishObj
		for _, id := range ids {
			objs := GetDishObjList(*id)
			objList := entities.GetObjListByIds(objs)
			var finObjList []*model.Object
			for _, object := range objList {
				finObj := model.Object{
					ID:   object.Id,
					Name: object.Name,
				}
				finObjList = append(finObjList, &finObj)
			}
			result := model.DishObj{
				Dishid:   *id,
				DishList: finObjList,
			}
			finalResult = append(finalResult, &result)
		}
		return finalResult
	} else {
		return nil
	}
}

// GetDishObjList 根据dish获取其关联objects
func GetDishObjList(id string) []*string {
	dish := &entities.Dish{Id: db.StrToNum(id)}
	dish = dish.SearchForDish()
	if dish != nil {
		objstr := dish.Objs
		return db.StrToArr(objstr)
	} else {
		return nil
	}
}

// GetDishObj 获取dish相关对象数组
//func getDishObj(id string) []*model.ObjValContent {
//	var obj []*model.ObjValContent
//	rows, _ := db.Db.Raw("SELECT val_id valid, name, label, val FROM `v_obj_values` WHERE `id` = ?", id).Rows()
//	for rows.Next() {
//		var objItem model.ObjValContent
//		err := db.Db.ScanRows(rows, &objItem)
//		if err != nil {
//			return nil
//		}
//		obj = append(obj, &objItem)
//	}
//	return obj
//}

// GetDishObj 获取展示用菜品对象
//func getShowDishObj(id string) []*model.TObjValRel {
//	var obj = new([]*model.TObjValRel)
//	db.Db.Raw("SELECT val_id valID, id ObjId, name objName, label FROM `v_obj_values` WHERE `id` = ?", id).Scan(&obj)
//	return *obj
//}
