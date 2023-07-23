package service

import (
	"ByDishBackend/db"
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
)

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
	if dish.Objs == nil {
		return -1
	}

	newdish := &entities.Dish{
		Name:        *dish.Name,
		Pic:         *dish.Pic,
		Freq:        *dish.Freq,
		Description: *dish.Description,
		Avb:         *dish.Avb,
		Label:       db.ArrToStr(dish.Label),
		Objs:        db.ArrToStr(dish.Objs),
	}

	return newdish.AddDish()
}

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
	}
	return &result
}

func SearchForDishList(dishIn *model.DishInput) []*model.Dish {
	var dishList *[]entities.Dish
	if dishIn.ID == nil {
		dishIn.ID = new(string)
		*dishIn.ID = ""
	}
	if dishIn.Name == nil {
		dishIn.Name = new(string)
		*dishIn.Name = ""
	}
	if dishIn.Pic == nil {
		dishIn.Pic = new(string)
		*dishIn.Pic = ""
	}
	if dishIn.Avb == nil {
		dishIn.Avb = new(int)
		*dishIn.Avb = 0
	}
	if dishIn.Freq == nil {
		dishIn.Freq = new(int)
		*dishIn.Freq = 0
	}
	if dishIn.Description == nil {
		dishIn.Description = new(string)
		*dishIn.Description = ""
	}
	if dishIn.IntType == nil {
		dishIn.IntType = new(int)
		*dishIn.IntType = 0
	}
	var dish = entities.Dish{
		Id:          db.StrToNum(*dishIn.ID),
		Name:        *dishIn.Name,
		Description: *dishIn.Description,
		Pic:         *dishIn.Pic,
		Freq:        *dishIn.Freq,
		Type:        *dishIn.IntType,
		Avb:         *dishIn.Avb,
	}
	var resultList []*model.Dish
	dishList = dish.FindDishList(*dishIn.PageNo, *dishIn.PageSize)
	for _, value := range *dishList {
		resultList = append(resultList, &model.Dish{
			ID:          db.NumToStr(value.Id),
			Name:        &value.Name,
			Description: &value.Description,
			Pic:         &value.Pic,
			Freq:        &value.Freq,
			IntType:     &value.Type,
			Avb:         &value.Avb,
		})
	}

	return resultList
}

// DishObjList 获取dish相关obj和关联值
func DishObjList(id *string) []*model.ObjValList {
	if id != nil {
		objs := GetDishObjList(*id)
		resultList := new([]*model.ObjValList)
		if objs != nil {
			for _, obj := range objs {
				objVal := &model.ObjValList{
					ObjID:   *obj,
					ValList: getDishObj(*obj),
				}
				*resultList = append(*resultList, objVal)
			}
		}
		return *resultList
	} else {
		return nil
	}
}

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
func getDishObj(id string) []*model.ObjValContent {
	var obj []*model.ObjValContent
	rows, _ := db.Db.Raw("SELECT val_id valid, name, label, val FROM `v_obj_values` WHERE `id` = ?", id).Rows()
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

// GetDishObj 获取展示用菜品对象
func getShowDishObj(id string) []*model.TObjValRel {
	var obj = new([]*model.TObjValRel)
	db.Db.Raw("SELECT val_id valID, id ObjId, name objName, label FROM `v_obj_values` WHERE `id` = ?", id).Scan(&obj)
	return *obj
}
