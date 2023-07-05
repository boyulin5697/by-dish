package service

import (
	"ByDishBackend/db"
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"strings"
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

	newdish := &entities.Dish{
		Name:        *dish.Name,
		Pic:         *dish.Pic,
		Freq:        *dish.Freq,
		Description: *dish.Description,
		Avb:         *dish.Avb,
		Label:       arrToLabelStr(dish.Label),
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
	var dish *entities.Dish
	dish = dish.SearchForDish(*dishIn.ID)
	result := model.Dish{
		ID:          db.NumToStr(dish.Id),
		Name:        &dish.Name,
		Pic:         &dish.Pic,
		Freq:        &dish.Freq,
		Description: &dish.Description,
		Avb:         &dish.Avb,
		Label:       labelStrToArr(dish.Label),
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

// arrToLabelStr 获取标签字符串
func arrToLabelStr(arr []*string) string {
	var labelStr string
	if arr != nil {
		for i := 0; i < len(arr); i++ {
			tmp := arr[0]
			labelStr += *tmp
			if i != len(arr)-1 {
				labelStr += ","
			}
		}
	} else {
		labelStr = ""
	}
	return labelStr
}

// labelStrToArr 根据标签字符串获得数组
func labelStrToArr(str string) []*string {
	var arr []*string
	var arrStr []string
	arrStr = strings.Split(str, ",")
	if len(arrStr) == 0 {
		return arr
	}
	for i := range arrStr {
		arr = append(arr, &arrStr[i])
	}
	return arr
}
