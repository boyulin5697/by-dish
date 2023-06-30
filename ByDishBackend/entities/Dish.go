package entities

import (
	"ByDishBackend/db"
)

type Dish struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Pic         string `json:"pic"`
	Freq        int    `json:"freq"`
	Type        int    `json:"type"`
	Description string `json:"description"`
	Avb         int    `json:"avb"`
}

func (Dish) TableName() string {
	return "dish"
}

func (dish *Dish) AddDish() int {
	db.Db.Create(&dish)
	return 1
}

func (dish *Dish) Save() int {
	db.Db.Exec("UPDATE `dish` SET `id` = ? , `name` = ?, `pic` = ?, `freq` = ?;", dish.Id, dish.Name, dish.Pic, dish.Freq)
	return 1
}

func (dish *Dish) Delete(id string) int {
	db.Db.Exec("DELETE FROM `dish` WHERE `id` = ?;", id)
	return 1
}

func (dish *Dish) find(id string) *Dish {
	db.Db.Where(&Dish{Id: id}).First(&dish)
	return dish
}

func (dish *Dish) SearchForDish(id string) *Dish {
	db.Db.Where(&Dish{Id: id}, &dish)
	return dish
}

// FindDishList  根据提供的入参分页搜索满足条件的列表
func (dish *Dish) FindDishList(pageNo int, pageSize int) *[]Dish {
	var dishList []Dish
	db.Db.Scopes(db.Paginate(pageNo, pageSize)).Where(&dish).Find(&dishList)
	return &dishList
}
