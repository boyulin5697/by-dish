package entities

import (
	"ByDishBackend/db"
)

type Dish struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Pic         string `json:"pic"`
	Freq        int    `json:"freq"`
	Type        int    `json:"type"`
	Description string `json:"description"`
	Avb         int    `json:"avb"`
	Label       string `json:"label"`
	Objs        string `json:"objs"`
}

func (Dish) TableName() string {
	return "dish"
}

func (dish *Dish) AddDish() int {
	db.Db.Create(&dish)
	return 1
}

func (dish *Dish) Save() int {
	db.Db.Model(&dish).Updates(Dish{
		Id:          dish.Id,
		Name:        dish.Name,
		Pic:         dish.Pic,
		Freq:        dish.Freq,
		Type:        dish.Type,
		Description: dish.Description,
		Avb:         dish.Avb,
		Label:       dish.Label,
		Objs:        dish.Objs,
	})
	return 1
}

func (dish *Dish) Delete(id string) int {
	db.Db.Exec("DELETE FROM `dish` WHERE `id` = ?;", db.StrToNum(id))
	return 1
}

func (dish *Dish) find(id string) *Dish {
	db.Db.First(dish, "id = ?", id)
	return dish
}

func (dish *Dish) SearchForDish() *Dish {
	db.Db.Where(dish).First(dish)
	return dish
}

// FindDishList  根据提供的入参分页搜索满足条件的列表
func (dish *Dish) FindDishList(pageNo int, pageSize int) *[]Dish {
	var dishList []Dish
	db.Db.Scopes(db.Paginate(pageNo, pageSize)).Where(&dish).Find(&dishList)
	return &dishList
}
