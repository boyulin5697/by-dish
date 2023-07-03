package service

import (
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"github.com/google/uuid"
	"strings"
)

func AddDish(dish *model.DishInput) int {
	id, err := uuid.NewUUID()
	if err != nil {
		return 0
	}
	idstr := strings.Replace(id.String(), "-", "", -1)
	if dish.Pic == nil {
		dish.Pic = new(string)
		*dish.Pic = ""
	}
	if dish.Avb == nil {
		dish.Avb = new(int)
		*dish.Avb = 0
	}
	if dish.Label == nil {
		dish.Label = new(string)
		*dish.Label = ""
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
		Id:          idstr,
		Name:        *dish.Name,
		Pic:         *dish.Pic,
		Freq:        *dish.Freq,
		Description: *dish.Description,
		Avb:         *dish.Avb,
	}

	return newdish.AddDish()
}

func UpdateDish(dish *model.DishInput) int {
	newdish := &entities.Dish{
		Id:          *dish.ID,
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
		ID:          &dish.Id,
		Name:        dish.Name,
		Pic:         dish.Pic,
		Freq:        dish.Freq,
		Description: dish.Description,
		Avb:         dish.Avb,
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
	if dishIn.Label == nil {
		dishIn.Label = new(string)
		*dishIn.Label = ""
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
		Id:          *dishIn.ID,
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
			ID:          &value.Id,
			Name:        value.Name,
			Description: value.Description,
			Pic:         value.Pic,
			Freq:        value.Freq,
			IntType:     value.Type,
			Avb:         value.Avb,
		})
	}

	return resultList
}
